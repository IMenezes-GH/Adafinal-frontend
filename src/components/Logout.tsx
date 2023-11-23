import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../api/fetchData"
import { UserContext } from "../context/UserProvider"



const Logout = () => {
    
    const {setToken, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleLogout = async () => {

        const response = await fetch(BASE_URL + '/auth/logout', {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok){
            setToken(null)
            setUser(null)
        }
    }

    useEffect(() => {
        handleLogout()
        navigate('/')
    })

  return (
    <div>Logout...</div>
  )
}

export default Logout