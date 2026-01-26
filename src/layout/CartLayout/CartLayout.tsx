import React from 'react'
import CarHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

interface Props {
  children?: React.ReactNode
}

export default function CartLayout({ children }: Props) {
  // Nội dung chính của trang sẽ được chèn ở đây của {children}
  //vì sao là props: vì ta truyền nội dung chính của trang từ component cha vào MainLayout thông qua props children
  return (
    <div>
      <CarHeader />
      {children}
      <Footer />
    </div>
  )
}
