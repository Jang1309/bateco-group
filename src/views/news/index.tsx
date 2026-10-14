import PageHero from '@/components/shared/page-hero'
import NewsCategories from '@/views/news/categories'
import FeaturedNews from '@/views/news/featured'
import NewsHighlights from '@/views/news/highlights'

const NewsView = () => {
  return (
    <main>
      <PageHero
        eyebrow='Tin tức'
        title='Định hình phong cách'
        highlight='sống tương lai'
        description='Ứng dụng công nghệ hiện đại và năng lượng xanh để kiến tạo những giá trị sống chuẩn mực, cùng cơ hội đầu tư bền vững lâu dài cho cộng đồng.'
        // TODO: thay bằng ảnh hero riêng của trang tin tức
        image='/home/vision/d-img-1.jpg'
      />
      <FeaturedNews />
      <NewsCategories />
      <NewsHighlights />
    </main>
  )
}

export default NewsView
