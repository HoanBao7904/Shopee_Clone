import React, { createContext, useState } from 'react'
import type { User } from 'src/types/user.type'
import { getAccessToken, getProfile } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  SetIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const init: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()), //ép hàm sang kiểu boolean
  SetIsAuthenticated: () => null,
  profile: getProfile(),
  setProfile: () => null
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(init)
//vì sao thz createContext cần giá trị init:vì khi mà ta không truyền value vào thì sẽ lấy thz init

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, SetIsAuthenticated] = useState<boolean>(init.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(init.profile)
  //giải thích vì sao cần có init cho createContext

  return (
    <AppContext.Provider value={{ isAuthenticated, SetIsAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}
