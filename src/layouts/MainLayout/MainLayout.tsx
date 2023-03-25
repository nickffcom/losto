import Footer from 'src/components/Layout/Footer'
import Header from 'src/components/Layout/Header'
import HeaderMobile from 'src/components/Layout/HeaderMobile'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div className='font-lotso-ecom text-primary-3B3A3C dark:bg-gradient-to-b dark:from-neutral-900 dark:via-zinc-800 dark:to-neutral-900 dark:text-white'>
      <Header />
      <HeaderMobile />
      <div className='container mx-auto mt-7 flex flex-col items-center justify-center'>{children}</div>
      <Footer />
    </div>
  )
}
