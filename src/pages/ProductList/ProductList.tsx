import Card from 'src/components/Card'

export default function ProductList() {
  return (
    <>
      <div className='grid grid-cols-1 gap-5 mmd:grid-cols-12 lg:gap-6'>
        <div className='mmd:col-span-3'>All Categories</div>
        <div className='mmd:col-span-9'>
          <div className='rounded-10 bg-F8F8FB px-3 py-2 lg:p-4'>SORT BY:</div>
          <div className='mt-5 grid grid-cols-1 gap-5 xsm:grid-cols-2 sm:grid-cols-3 lg:mt-6 lg:gap-6'>
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  )
}
