import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/AuthHeader'

interface Props {
  children?: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <>
      <RegisterHeader />
      <div className='container mx-auto mt-7 flex flex-col items-center justify-center'>{children}</div>
      <Footer />
    </>
  )
}
