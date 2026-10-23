import PageHero from '@/components/shared/page-hero'
import CareersJobs from '@/views/careers/jobs'
import CareersProcess from '@/views/careers/process'
import CareersWhy from '@/views/careers/why'

const CareersView = () => {
  return (
    <main>
      <PageHero
        eyebrow='Cơ hội nghề nghiệp'
        title='Khám phá'
        highlight='để dẫn đầu'
        description='Tư duy kiến tạo - Năng lực thực thi'
        // TODO: thay bằng ảnh hero riêng trang tuyển dụng
        image='/home/vision/d-img-2.jpg'
      />
      <CareersWhy />
      <CareersJobs />
      <CareersProcess />
    </main>
  )
}

export default CareersView
