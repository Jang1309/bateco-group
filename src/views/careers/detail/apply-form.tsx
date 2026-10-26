'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CloudUpload, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { HONEYPOT_FIELD } from '@/lib/form-guard'
import { cn } from '@/lib/utils'

type ApplyFormProps = {
  jobTitle: string
  /** Trong drawer mobile: bỏ card/title trùng với header drawer */
  variant?: 'card' | 'drawer'
  onSuccess?: () => void
}

const ACCEPT = '.pdf,.doc,.docx'
const MAX_BYTES = 25 * 1024 * 1024
const ALLOWED_EXT = new Set(['pdf', 'doc', 'docx'])

const INPUT_CLASS =
  'h-[2.875rem] rounded-[0.5rem] border-[#E2E8F0] bg-white px-[0.875rem] text-[0.875rem] text-[#1A2B48] shadow-none placeholder:text-[#94A3B8] focus-visible:border-[#B5935E] focus-visible:ring-[#B5935E]/20 md:text-[0.875rem]'

const LABEL_CLASS = 'mb-[0.375rem] text-[0.8125rem] font-semibold text-[#1A2B48]'

type SchemaMessageKey =
  'required' | 'invalidEmail' | 'invalidPhone' | 'cvRequired' | 'cvTooLarge' | 'cvInvalidType'

const createApplySchema = (t: (key: SchemaMessageKey) => string) =>
  z.object({
    fullName: z.string().trim().min(1, t('required')).min(2, t('required')),
    email: z.email(t('invalidEmail')),
    phone: z
      .string()
      .trim()
      .min(1, t('required'))
      .regex(/^[0-9+\s()-]{8,20}$/, t('invalidPhone')),
    cvFile: z
      .instanceof(File, { message: t('cvRequired') })
      .refine((file) => file.size <= MAX_BYTES, t('cvTooLarge'))
      .refine((file) => {
        const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
        return ALLOWED_EXT.has(ext)
      }, t('cvInvalidType')),
    position: z.string().min(1),
    pageUrl: z.string(),
    submittedAt: z.string(),
    /** Honeypot — must stay empty */
    [HONEYPOT_FIELD]: z.string().optional(),
  })

type ApplyValues = z.infer<ReturnType<typeof createApplySchema>>

const ApplyForm = ({ jobTitle, variant = 'card', onSuccess }: ApplyFormProps) => {
  const t = useTranslations('Careers')
  const applySchema = useMemo(() => createApplySchema(t), [t])
  const isDrawer = variant === 'drawer'
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const form = useForm<ApplyValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      position: jobTitle,
      pageUrl: '',
      submittedAt: '',
      [HONEYPOT_FIELD]: '',
    },
  })

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = form

  const cvFile = watch('cvFile')

  useEffect(() => {
    setValue('position', jobTitle)
  }, [jobTitle, setValue])

  const onSubmit = handleSubmit(async (values) => {
    try {
      const body = new FormData()
      body.set('fullName', values.fullName)
      body.set('email', values.email)
      body.set('phone', values.phone)
      body.set('cvFile', values.cvFile)
      body.set('position', values.position || jobTitle)
      body.set('pageUrl', window.location.href)
      body.set('submittedAt', format(new Date(), 'dd/MM/yyyy HH:mm:ss'))
      // Honeypot — leave empty; bots that autofill get silently dropped server-side
      body.set(HONEYPOT_FIELD, values[HONEYPOT_FIELD] ?? '')

      // API trả ngay; CF7 gửi mail chạy nền → không chờ SMTP
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body,
      })
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean
        message?: string
      } | null

      if (response.status === 429) {
        toast.error(result?.message || t('error'))
        return
      }

      if (!response.ok || !result?.ok) {
        toast.error(result?.message || t('error'))
        return
      }

      toast.success(result.message || t('success'))
      reset({
        fullName: '',
        email: '',
        phone: '',
        position: jobTitle,
        pageUrl: '',
        submittedAt: '',
        [HONEYPOT_FIELD]: '',
        cvFile: undefined,
      })
      if (fileInputRef.current) fileInputRef.current.value = ''
      onSuccess?.()
    } catch {
      toast.error(t('error'))
    }
  })

  return (
    <form
      className={cn(
        'relative',
        isDrawer
          ? 'bg-transparent p-0'
          : 'rounded-[1rem] bg-white p-[1.75rem] shadow-[0_1rem_2.5rem_-1.25rem_rgba(26,43,72,0.2)] ring-1 ring-[#1A2B48]/[0.06]',
      )}
      onSubmit={onSubmit}
      noValidate
    >
      {!isDrawer ? (
        <>
          <h2 className='text-[1.25rem] font-bold text-[#1A2B48]'>{t('applyNow')}</h2>
          <p className='mt-[0.375rem] line-clamp-2 text-[0.8125rem] leading-[1.5] text-[#64748B]'>
            {jobTitle}
          </p>
        </>
      ) : null}

      <input
        type='hidden'
        {...register('position')}
      />
      <input
        type='hidden'
        {...register('pageUrl')}
      />
      <input
        type='hidden'
        {...register('submittedAt')}
      />
      {/* Honeypot: visually hidden, not tabbable; bots that autofill get dropped */}
      <div
        aria-hidden
        className='pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0'
      >
        <label htmlFor={HONEYPOT_FIELD}>Company website</label>
        <input
          id={HONEYPOT_FIELD}
          type='text'
          tabIndex={-1}
          autoComplete='off'
          {...register(HONEYPOT_FIELD)}
        />
      </div>

      <FieldGroup
        className={cn('gap-[1rem]', !isDrawer && 'mt-[1.5rem]')}
        data-disabled={isSubmitting || undefined}
      >
        <Field
          data-invalid={!!errors.fullName || undefined}
          data-disabled={isSubmitting || undefined}
        >
          <FieldLabel
            htmlFor='fullName'
            className={LABEL_CLASS}
          >
            {t('fullName')}
          </FieldLabel>
          <Input
            id='fullName'
            autoComplete='name'
            placeholder={t('namePlaceholder')}
            disabled={isSubmitting}
            aria-invalid={!!errors.fullName}
            className={INPUT_CLASS}
            {...register('fullName')}
          />
          <FieldError errors={[errors.fullName]} />
        </Field>

        <div className='grid grid-cols-2 gap-[0.75rem] xsm:grid-cols-1'>
          <Field
            data-invalid={!!errors.email || undefined}
            data-disabled={isSubmitting || undefined}
          >
            <FieldLabel
              htmlFor='email'
              className={LABEL_CLASS}
            >
              {t('email')}
            </FieldLabel>
            <Input
              id='email'
              type='email'
              autoComplete='email'
              placeholder='email@example.com'
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              className={INPUT_CLASS}
              {...register('email')}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field
            data-invalid={!!errors.phone || undefined}
            data-disabled={isSubmitting || undefined}
          >
            <FieldLabel
              htmlFor='phone'
              className={LABEL_CLASS}
            >
              {t('phone')}
            </FieldLabel>
            <Input
              id='phone'
              type='tel'
              autoComplete='tel'
              placeholder='09xx xxx xxx'
              disabled={isSubmitting}
              aria-invalid={!!errors.phone}
              className={INPUT_CLASS}
              {...register('phone')}
            />
            <FieldError errors={[errors.phone]} />
          </Field>
        </div>

        <Field
          data-invalid={!!errors.cvFile || undefined}
          data-disabled={isSubmitting || undefined}
        >
          <FieldLabel className={LABEL_CLASS}>{t('cv')}</FieldLabel>
          <Controller
            name='cvFile'
            control={control}
            render={({ field }) => (
              <>
                <button
                  type='button'
                  disabled={isSubmitting}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => {
                    if (isSubmitting) return
                    event.preventDefault()
                    setDragging(true)
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(event) => {
                    event.preventDefault()
                    setDragging(false)
                    if (isSubmitting) return
                    const file = event.dataTransfer.files?.[0]
                    if (file) field.onChange(file)
                  }}
                  className={cn(
                    'flex w-full flex-col items-center gap-[0.5rem] rounded-[0.75rem] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-[1rem] py-[1.5rem] text-center transition-colors duration-300 disabled:pointer-events-none disabled:opacity-60',
                    dragging && 'border-[#B5935E] bg-[#FBF8F2]',
                    errors.cvFile && 'border-destructive/40',
                  )}
                >
                  <CloudUpload
                    className='size-[1.5rem] text-[#B5935E]'
                    strokeWidth={1.5}
                  />
                  <span className='text-[0.875rem] font-semibold text-[#1A2B48]'>
                    {cvFile?.name || t('cvDrop')}
                  </span>
                  <span className='text-[0.75rem] text-[#94A3B8]'>{t('cvHint')}</span>
                </button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept={ACCEPT}
                  disabled={isSubmitting}
                  className='sr-only'
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    field.onChange(file)
                  }}
                />
              </>
            )}
          />
          <FieldError errors={[errors.cvFile]} />
        </Field>

        <Button
          type='submit'
          disabled={isSubmitting}
          className='h-[2.875rem] w-full gap-[0.5rem] rounded-[0.5rem] bg-[#1A2B48] text-[0.875rem] font-bold text-white hover:bg-[#243656]'
        >
          <Send
            className='size-[1rem]'
            strokeWidth={1.75}
          />
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </FieldGroup>
    </form>
  )
}

export default ApplyForm
