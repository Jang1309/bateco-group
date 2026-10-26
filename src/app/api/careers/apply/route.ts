import { format } from 'date-fns'
import { after } from 'next/server'

import ENDPOINTS from '@/configs/endpoints'
import CF7Request from '@/fetches/cf7Request'

export const maxDuration = 60

const MAX_BYTES = 25 * 1024 * 1024
const ALLOWED_EXT = new Set(['pdf', 'doc', 'docx'])

export async function POST(request: Request) {
  const formData = await request.formData()

  const fullName = String(formData.get('fullName') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const position = String(formData.get('position') ?? '').trim()
  const pageUrl = String(formData.get('pageUrl') ?? '').trim()
  const submittedAt =
    String(formData.get('submittedAt') ?? '').trim() || format(new Date(), 'dd/MM/yyyy HH:mm:ss')
  const cvFile = formData.get('cvFile')

  if (!fullName || !email || !phone || !position) {
    return Response.json({ ok: false, message: 'Thiếu thông tin bắt buộc.' }, { status: 400 })
  }

  if (!(cvFile instanceof File) || cvFile.size === 0) {
    return Response.json(
      { ok: false, message: 'Vui lòng tải lên hồ sơ ứng tuyển.' },
      { status: 400 },
    )
  }

  const ext = cvFile.name.split('.').pop()?.toLowerCase() ?? ''
  if (!ALLOWED_EXT.has(ext) || cvFile.size > MAX_BYTES) {
    return Response.json(
      { ok: false, message: 'CV phải là PDF/DOC/DOCX và không vượt quá 25MB.' },
      { status: 400 },
    )
  }

  // Trả success ngay; CF7 (gửi mail) chạy sau response để không giữ user chờ SMTP.
  after(async () => {
    try {
      const cf7 = new CF7Request({
        fullName,
        email,
        phone,
        cvFile,
        position,
        pageUrl,
        submittedAt,
      })
      await cf7.send({
        id: ENDPOINTS.careers.form_id,
        unitTag: ENDPOINTS.careers.unit_tag,
      })
    } catch (error) {
      console.error('[careers/apply] CF7 background send failed:', error)
    }
  })

  return Response.json({
    ok: true,
    message: 'Gửi hồ sơ thành công. Chúng tôi sẽ liên hệ sớm.',
  })
}
