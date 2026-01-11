import type { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'
/* eslint-disable @typescript-eslint/no-unused-vars */

// export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)

// export const loginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)

// export const logoutAccount = () => http.post('/logout')

const authAPi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/register', body)
  },
  loginAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body),
  logoutAccount: () => http.post('/logout')
}

export default authAPi
