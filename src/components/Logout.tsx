import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const URL = 'http://localhost:3000'

interface props {
    setToken: CallableFunction,
    setUser: CallableFunction
}

const Logout = (props: props) => {
    
    const navigate = useNavigate();
    
    const handleLogout = async () => {

        const response = await fetch(URL + '/auth/logout', {
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