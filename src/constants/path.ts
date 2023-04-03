const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  productlist: '/productlist',
  productDetail: '/:nameId',
  cart: '/cart',
  logout: '/logout'
} as const

export default path
