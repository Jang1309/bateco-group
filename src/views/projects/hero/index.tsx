import { ArrowRight } from 'lucide-react'

import PageHero from '@/components/shared/page-hero'

const ProjectsHero = () => {
  return (
    <PageHero
      eyebrow='Dự án'
      title='Định hình phong cách'
      highlight='sống tương lai'
      description='Ứng dụng công nghệ hiện đại và năng lượng xanh để kiến tạo những giá trị sống chuẩn mực, cùng cơ hội đầu tư bền vững lâu dài cho cộng đồng.'
      // TODO: thay bằng ảnh hero riêng của trang dự án
      image='/home/investment/d-card-2.png'
    >
      <a
        href='#du-an-khac'
        className='group inline-flex items-center gap-[0.625rem] rounded-full bg-[linear-gradient(93deg,#C9A468_0%,#B5935E_55%,#9E7C48_100%)] px-[1.75rem] py-[0.875rem] text-[0.8125rem] font-bold tracking-[0.06em] text-white uppercase shadow-[0_0.5rem_1.25rem_rgba(181,147,94,0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[0.125rem] hover:shadow-[0_0.75rem_1.5rem_rgba(181,147,94,0.45)]'
      >
        Khám phá dự án
        <ArrowRight className='size-[1rem] transition-transform duration-300 group-hover:translate-x-[0.25rem]' />
      </a>
    </PageHero>
  )
}

export default ProjectsHero
