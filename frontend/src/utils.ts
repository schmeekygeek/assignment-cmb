export async function storeJwt(token: string) {
  localStorage.setItem("token", token)
}

export function getJwt(): string {
  return localStorage.getItem("token") || ""
}

export function clearJwt() {
  localStorage.removeItem("token")
}

export function isLoggedIn(): Boolean {
  const token = localStorage.getItem("token")
  if ( token === '' || token === null ) {
    return false;
  }
  return true
}
