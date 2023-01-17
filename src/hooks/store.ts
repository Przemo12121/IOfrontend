export enum Roles {
  AUTOR = 'AUTOR',
  REDAKTOR = 'REDAKTOR',
  ADMIN = 'ADMIN',
  CZYTELNIK = 'CZYTELNIK'
}

export type UserDto = { email: string, role: Roles, token: string }

export const getUser = () => {
  const u = localStorage.getItem('user')
  return u ? JSON.parse(u) as UserDto : null 
} 
export const setUser = (user: { email: string, role: Roles, token: string }) => localStorage.setItem('user', JSON.stringify(user))
export const removeUser = () => localStorage.removeItem('user')