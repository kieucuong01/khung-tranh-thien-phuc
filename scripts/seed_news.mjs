import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding news data...')

  const newsData = [
    {
      title: 'Thủ tục đăng ký kinh doanh mới nhất 2026',
      excerpt: 'Hướng dẫn chi tiết quy trình đăng ký thành lập doanh nghiệp, các hồ sơ cần chuẩn bị và những lưu ý quan trọng để tránh bị từ chối.',
      content: `
        <h2>1. Quy trình đăng ký kinh doanh</h2>
        <p>Để thành lập doanh nghiệp trong năm 2026, các chủ doanh nghiệp cần tuân thủ các bước sau:</p>
        <ul>
          <li>Bước 1: Chuẩn bị hồ sơ đăng ký doanh nghiệp.</li>
          <li>Bước 2: Nộp hồ sơ trực tuyến qua Cổng thông tin quốc gia.</li>
          <li>Bước 3: Nhận kết quả và thực hiện các thủ tục sau thành lập.</li>
        </ul>
        <p>Hồ sơ bao gồm: Giấy đề nghị đăng ký doanh nghiệp, Điều lệ công ty, Danh sách thành viên/cổ đông...</p>
        <h2>2. Những lưu ý về vốn điều lệ</h2>
        <p>Mặc dù pháp luật không quy định mức vốn tối thiểu cho hầu hết các ngành nghề, nhưng chủ doanh nghiệp nên cân nhắc mức vốn phù hợp với quy mô và uy tín đối với đối tác.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      category: 'Đăng ký kinh doanh'
    },
    {
      title: 'Những thay đổi quan trọng trong chuẩn mực kế toán năm 2026',
      excerpt: 'Cập nhật các quy định mới nhất về hạch toán hóa đơn điện tử, quản lý chi phí và các báo cáo tài chính bắt buộc theo thông tư mới.',
      content: `
        <h2>1. Hóa đơn điện tử khởi tạo từ máy tính tiền</h2>
        <p>Việc áp dụng hóa đơn điện tử ngày càng được siết chặt nhằm minh bạch hóa các hoạt động kinh doanh bán lẻ.</p>
        <h2>2. Hạch toán các khoản chi phí không có chứng từ</h2>
        <p>Kế toán cần lưu ý các quy định về chi phí hợp lý khi tính thuế TNDN để tránh bị loại chi phí khi quyết toán.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      category: 'Kế Toán'
    },
    {
      title: 'Hướng dẫn quyết toán thuế TNCN cho cá nhân có nhiều nguồn thu nhập',
      excerpt: 'Bạn có thu nhập từ nhiều nơi? Xem ngay hướng dẫn cách tự quyết toán thuế online nhanh chóng và chính xác nhất.',
      content: `
        <h2>1. Đối tượng phải tự quyết toán thuế</h2>
        <p>Cá nhân cư trú có thu nhập từ tiền lương, tiền công từ hai nơi trở lên mà không ủy quyền cho đơn vị chi trả thu nhập quyết toán thay.</p>
        <h2>2. Thời hạn nộp hồ sơ</h2>
        <p>Thông thường thời hạn cuối cùng là ngày cuối cùng của tháng 4 hàng năm.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop',
      category: 'Thuế'
    },
    {
      title: 'Vai trò của Kiểm toán trong việc minh bạch tài chính doanh nghiệp',
      excerpt: 'Tại sao doanh nghiệp cần kiểm toán độc lập? Lợi ích của việc kiểm toán đối với uy tín của công ty trước các nhà đầu tư và ngân hàng.',
      content: `
        <p>Kiểm toán không chỉ là một thủ tục bắt buộc đối với một số loại hình doanh nghiệp mà còn là công cụ giúp ban lãnh đạo kiểm soát rủi ro tài chính.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1000&auto=format&fit=crop',
      category: 'Kiểm Toán'
    },
    {
      title: 'Mức đóng BHXH mới nhất từ tháng 7/2026',
      excerpt: 'Cập nhật bảng lương cơ sở và tỷ lệ đóng bảo hiểm xã hội, bảo hiểm y tế cho người lao động và người sử dụng lao động.',
      content: `
        <p>Chính sách điều chỉnh lương cơ sở sẽ kéo theo sự thay đổi về mức đóng BHXH tối đa và tối thiểu.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1000&auto=format&fit=crop',
      category: 'BHXH'
    },
    {
      title: 'Phân tích dòng tiền trong đầu tư Bất động sản 2026',
      excerpt: 'Những yếu tố tài chính then chốt ảnh hưởng đến lợi nhuận đầu tư BDS và cách quản lý nợ vay hiệu quả trong bối cảnh lãi suất biến động.',
      content: `
        <p>Tài chính bất động sản đòi hỏi sự am hiểu về cả thị trường và các công cụ đòn bẩy tài chính.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
      category: 'Tài chính BDS'
    },
    {
      title: 'Thiên Phúc tuyển dụng Chuyên viên Thuế kinh nghiệm',
      excerpt: 'Chúng tôi đang tìm kiếm những cộng sự tài năng để cùng xây dựng những giải pháp tài chính tốt nhất cho khách hàng. Chế độ đãi ngộ hấp dẫn.',
      content: `
        <p>Gia nhập đội ngũ Thiên Phúc để có cơ hội làm việc trong môi trường chuyên nghiệp và năng động.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop',
      category: 'Tuyển Dụng'
    }
  ]

  for (const item of newsData) {
    await prisma.blog.create({
      data: item
    })
  }

  console.log('Seeding news data completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
