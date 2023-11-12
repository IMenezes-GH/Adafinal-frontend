import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Logout logic
    }

    useEffect(() => {
        navigate('/')
    }, [])
  return (
    <div>Logout...</div>
  )
}

export default Logout