export const saveAccesTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccesTokenFromLS = () => {
  localStorage.clear()
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
