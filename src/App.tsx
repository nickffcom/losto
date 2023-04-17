import { Suspense, useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import ErrorBoundary from './components/ErrorBoundary'
import ScrollTop from './components/ScrollTop'
import { AppContext } from './contexts/app.context'
import { localStorageEventTarget } from './utils/auth'
import useRouteElements from './useRouteElements'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', () => {
      reset
    })
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div>
      <ErrorBoundary>
        <ScrollTop />
        <Suspense fallback={<div />}>{routeElements}</Suspense>
        <ToastContainer />
      </ErrorBoundary>
    </div>
  )
}

export default App
