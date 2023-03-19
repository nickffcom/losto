import Footer from 'src/components/Layout/Footer'
import RegisterHeader from 'src/components/Layout/AuthHeader'

interface Props {
  children?: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='font-lotso-ecom dark:bg-gradient-to-b dark:from-neutral-900 dark:via-zinc-800 dark:to-neutral-900'>
      <RegisterHeader />
      <div className='container mx-auto mt-7 flex flex-col items-center justify-center'>{children}</div>
      <Footer />
    </div>
  )
}
