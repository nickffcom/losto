import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScrollTop from './components/ScrollTop'

function App() {
  const routeElements = useRouteElements()
  return (
    <div>
      <ScrollTop />
      {routeElements} <ToastContainer />
    </div>
  )
}

export default App
