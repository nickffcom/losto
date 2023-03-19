import { useRoutes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      path: '/login',
      element: (
        <AuthLayout>
          <Login />
        </AuthLayout>
      )
    },
    {
      path: '/register',
      element: (
        <AuthLayout>
          <Register />
        </AuthLayout>
      )
    }
  ])
  return routeElements
}
