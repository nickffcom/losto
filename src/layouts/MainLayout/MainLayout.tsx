import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div className='dark:bg-dark-primary'>
      <Header />
      <div className='container mx-auto mt-7 flex flex-col items-center justify-center'>{children}</div>
      <Footer />
    </div>
  )
}
