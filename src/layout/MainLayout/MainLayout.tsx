import React from 'react'
import Footer from 'src/components/Footer'
import HeaderMain from 'src/components/HeaderMain'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  // Nội dung chính của trang sẽ được chèn ở đây của {children}
  //vì sao là props: vì ta truyền nội dung chính của trang từ component cha vào MainLayout thông qua props children
  return (
    <div>
      <HeaderMain />
      {children}
      <Footer />
    </div>
  )
}
