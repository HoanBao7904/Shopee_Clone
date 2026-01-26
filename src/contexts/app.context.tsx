import React, { createContext, useState } from 'react'
import type { ExtendedPurchases } from 'src/types/purchases.type'
import type { User } from 'src/types/user.type'
import { getAccessToken, getProfile } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  SetIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchses: ExtendedPurchases[]
  setExtendedPurchses: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>
  reset: () => void
}

const init: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()), //ép hàm sang kiểu boolean
  SetIsAuthenticated: () => null,
  profile: getProfile(),
  setProfile: () => null,
  extendedPurchses: [],
  setExtendedPurchses: () => null,
  reset: () => null
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(init)
//vì sao thz createContext cần giá trị init:vì khi mà ta không truyền value vào thì sẽ lấy thz init

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, SetIsAuthenticated] = useState<boolean>(init.isAuthenticated)
  const [extendedPurchses, setExtendedPurchses] = useState<ExtendedPurchases[]>([])
  const [profile, setProfile] = useState<User | null>(init.profile)
  //giải thích vì sao cần có init cho createContext và useState:
  // vì khi ta khởi tạo context và state thì ta cần có giá trị ban đầu để tránh lỗi undefined khi truy cập vào context hoặc state trước khi chúng được cập nhật.
  const reset = () => {
    SetIsAuthenticated(false)
    setProfile(null)
    setExtendedPurchses([])
  }

  return (
    <AppContext.Provider
      value={{ isAuthenticated, SetIsAuthenticated, profile, setProfile, extendedPurchses, setExtendedPurchses, reset }}
    >
      {children}
    </AppContext.Provider>
  )
}
