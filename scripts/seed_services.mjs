import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const services = [
  {
    title: 'Thành lập doanh nghiệp',
    slug: 'thanh-lap-doanh-nghiep',
    category: 'Đăng ký kinh doanh',
    description: 'Tư vấn và thực hiện trọn gói thủ tục thành lập công ty, doanh nghiệp mới nhanh chóng, uy tín.',
    iconName: 'Building2',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    featured: true,
    content: `
      <h2>Dịch vụ Thành lập Doanh nghiệp Trọn gói</h2>
      <p>Bạn đang có ý tưởng kinh doanh và muốn bắt đầu hành trình khởi nghiệp? Chúng tôi cung cấp dịch vụ thành lập doanh nghiệp trọn gói, giúp bạn tiết kiệm thời gian và công sức để tập trung vào việc kinh doanh cốt lõi.</p>
      <h3>Tại sao nên chọn dịch vụ của chúng tôi?</h3>
      <ul>
        <li>Tư vấn miễn phí về loại hình doanh nghiệp, vốn điều lệ, ngành nghề kinh doanh.</li>
        <li>Thủ tục nhanh gọn, nhận giấy phép kinh doanh chỉ sau 3-5 ngày làm việc.</li>
        <li>Hỗ trợ trọn gói: Khắc dấu, đăng bố cáo, chữ ký số, hóa đơn điện tử.</li>
        <li>Cam kết không phát sinh chi phí ngoài hợp đồng.</li>
      </ul>
      <h3>Quy trình thực hiện</h3>
      <ol>
        <li>Tiếp nhận thông tin và tư vấn khách hàng.</li>
        <li>Soạn thảo hồ sơ theo quy định của pháp luật.</li>
        <li>Đại diện khách hàng nộp hồ sơ và làm việc với cơ quan đăng ký kinh doanh.</li>
        <li>Bàn giao kết quả tận nơi cho khách hàng.</li>
      </ol>
    `
  },
  {
    title: 'Dịch vụ kế toán doanh nghiệp',
    slug: 'dich-vu-ke-toan-doanh-nghiep',
    category: 'Kế toán',
    description: 'Giải pháp kế toán chuyên nghiệp, giúp doanh nghiệp tối ưu chi phí và đảm bảo tuân thủ pháp luật.',
    iconName: 'Calculator',
    image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
    featured: true,
    content: `
      <h2>Dịch vụ Kế toán Doanh nghiệp Chuyên nghiệp</h2>
      <p>Kế toán là bộ phận quan trọng đối với bất kỳ doanh nghiệp nào. Dịch vụ kế toán của chúng tôi giúp bạn yên tâm về sổ sách, chứng từ và các báo cáo tài chính.</p>
      <h3>Nội dung công việc</h3>
      <ul>
        <li>Kiểm tra, phân loại và sắp xếp chứng từ kế toán.</li>
        <li>Thực hiện ghi chép sổ sách kế toán trên phần mềm chuyên nghiệp.</li>
        <li>Lập các báo cáo thuế định kỳ (VAT, PIT, CIT).</li>
        <li>Lập báo cáo tài chính năm và quyết toán thuế.</li>
        <li>Tư vấn tối ưu chi phí và quản trị tài chính doanh nghiệp.</li>
      </ul>
    `
  },
  {
    title: 'Quyết toán thuế',
    slug: 'quyet-toan-thue',
    category: 'Thuế',
    description: 'Hỗ trợ doanh nghiệp thực hiện quyết toán thuế thu nhập doanh nghiệp, thuế thu nhập cá nhân chính xác.',
    iconName: 'FileText',
    image_url: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=800&auto=format&fit=crop',
    featured: true,
    content: `
      <h2>Dịch vụ Quyết toán Thuế Uy tín</h2>
      <p>Quyết toán thuế là công việc định kỳ đòi hỏi sự chính xác và am hiểu sâu sắc về luật thuế. Chúng tôi giúp doanh nghiệp rà soát sổ sách và lập báo cáo quyết toán đúng quy định.</p>
      <h3>Dịch vụ của chúng tôi bao gồm</h3>
      <ul>
        <li>Quyết toán thuế Thu nhập doanh nghiệp (CIT).</li>
        <li>Quyết toán thuế Thu nhập cá nhân (PIT).</li>
        <li>Rà soát, đối chiếu dữ liệu kế toán trước khi quyết toán.</li>
        <li>Đại diện doanh nghiệp làm việc và giải trình với cơ quan thuế.</li>
      </ul>
    `
  },
  {
    title: 'Đăng ký đầu tư nước ngoài',
    slug: 'dang-ky-dau-tu-nuoc-ngoai',
    category: 'Đầu tư',
    description: 'Hỗ trợ nhà đầu tư nước ngoài thiết lập hoạt động kinh doanh tại Việt Nam trọn gói và chuyên nghiệp.',
    iconName: 'Globe',
    image_url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop',
    featured: false,
    content: `
      <h2>Dịch vụ Đăng ký Đầu tư Nước ngoài</h2>
      <p>Việt Nam là điểm đến hấp dẫn cho các nhà đầu tư nước ngoài. Chúng tôi cung cấp dịch vụ tư vấn và thực hiện thủ tục cấp Giấy chứng nhận đăng ký đầu tư (IRC) và Giấy chứng nhận đăng ký doanh nghiệp (ERC).</p>
      <h3>Các dịch vụ hỗ trợ</h3>
      <ul>
        <li>Tư vấn lựa chọn hình thức đầu tư và địa điểm thực hiện dự án.</li>
        <li>Soạn thảo hồ sơ dự án đầu tư theo quy định.</li>
        <li>Thực hiện thủ tục xin cấp IRC và ERC.</li>
        <li>Hỗ trợ các thủ tục sau thành lập: Thuế, lao động, bảo hiểm.</li>
      </ul>
    `
  }
]

async function main() {
  console.log('Bắt đầu seed dịch vụ...')
  for (const s of services) {
    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    })
    console.log(`Đã tạo/cập nhật dịch vụ: ${service.title}`)
  }
  console.log('Hoàn thành seed dịch vụ.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
