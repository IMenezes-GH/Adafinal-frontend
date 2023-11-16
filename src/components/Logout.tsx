import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../api/fetchData"

interface props {
    setToken: CallableFunction,
    setUser: CallableFunction
}

const Logout = (props: props) => {
    
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
            props.setToken('')
            props.setUser({username: '', name: '', description: '', state: '', country: ''})
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