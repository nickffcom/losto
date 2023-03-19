import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/AuthHeader'

interface Props {
  children?: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='dark:bg-dark-primary'>
      <RegisterHeader />
      <div className='container mx-auto mt-7 flex flex-col items-center justify-center'>{children}</div>
      <Footer />
    </div>
  )
}
