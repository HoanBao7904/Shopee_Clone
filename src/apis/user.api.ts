import type { User } from 'src/types/user.type'
import type { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

// const URL = 'user/api'
interface bodyupdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userAPI = {
  getProfile() {
    return http.get<SuccessResponseApi<User>>('me')
  },
  updateProfile(body: bodyupdateProfile) {
    return http.put<SuccessResponseApi<User>>('user', body)
  },
  uploadAvata(body: FormData) {
    return http.post<SuccessResponseApi<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userAPI
