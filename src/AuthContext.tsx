import { useState, createContext, ReactElement } from "react";


interface IValue {
    token: string | null,
    login: CallableFunction,
    logout: CallableFunction
}

export const AuthContext = createContext(null);

interface Props {
    children: ReactElement | ReactElement[] | string | string[]
}

const AuthProvider = ({children}: Props) => {
  // const [user, setUser] = useState<User>({username: '', name: '', description: '', state: '', country: ''});
  const [token, setToken] = useState<string | null>(null);

  const login = (jwtToken: string) => {
    setToken(jwtToken)
  }

  const logout = () => {
    setToken(null)
  }


  const value: IValue = {
    token,
    login,
    logout
  }
  
  return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
  )
}

export default AuthProvider