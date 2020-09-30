import Cookie from 'js-cookie'

const TokenKey = 'MoleHello'
const AccountKey = 'MoleWorld'

export function getToken() {
  return Cookie.get(TokenKey)
}
export function setToken(token) {
  return Cookie.set(TokenKey, token)
}
export function removeToken() {
  return Cookie.remove(TokenKey)
}

export function getAccount() {
  return JSON.parse(Cookie.get(AccountKey) || '{}')
}
export function setAccount(user) {
  return Cookie.set(AccountKey, JSON.stringify(user))
}
export function removeAccount() {
  return Cookie.remove(AccountKey)
}
