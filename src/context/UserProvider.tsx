import { createContext, useState, useEffect, ReactNode } from "react"
import { refreshAPI } from "../api/fetchData";
import { JwtPayload, jwtDecode } from "jwt-decode";


interface IUserContext {
    user: User | null,
    token: string | null,
    setUser: CallableFunction,
    setToken: CallableFunction,
    search : string,
    setSearch: CallableFunction
}

export const UserContext = createContext<IUserContext>(
    {   user: null, 
        token: null, 
        setUser: () => {}, 
        setToken: () => {}, 
        search: '', 
        setSearch: () => {}})

interface IUserProvider {
    children: ReactNode
}
const UserProvider = ({children}: IUserProvider) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState(null);
    const [search, setSearch] = useState('');


    useEffect(() => {
    

        const jwt = token && (jwtDecode<JwtPayload>(token))
        const current_time: number = new Date().getTime() / 1000;
        if (!jwt || current_time > jwt['exp']) {
        const data = (async () => await refreshAPI())();
        data.then((d) => { // OBS: STRICT MODE BREAKS THIS
            if (d.ok){
            setUser(d.data.user)
            setToken(d.data.token)
            }
        })
        }
    }, [token, user])
  return (
    <UserContext.Provider value={{user, setUser, token, setToken, search, setSearch}}>
        {children}</UserContext.Provider>
  )
}

export default UserProvider