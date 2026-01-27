import { useLogout } from "../../api/authApi.js"
import { Navigate } from "react-router";

export default function Logout() {
    const { isLoggedOut } = useLogout()
    
    return isLoggedOut ? <Navigate to='/' /> : null
}