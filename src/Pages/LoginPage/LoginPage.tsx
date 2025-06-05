import { Button } from "@/components/ui/button"
import routes from "@/RouteManagement/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    document.title = 'Login'
    useEffect(() => {
         if( ( localStorage.getItem('sessionId')) || localStorage.getItem('guestSessionId')) {
            nav(routes.SCREEN_HOME) ;
         }
    } , [])
    const nav = useNavigate() ;
    function handleLogin() {
      nav(routes.SCREEN_TOKEN_GENERATE) ;
    }
    return (
        <div className="min-h-[calc(100vh-55px)] bg-[#0D253F] flex flex-col items-center justify-center gap-6">
            <Button className="w-[300px] h-[50px] border-white border font-bold" onClick={handleLogin}>Login from TMDB</Button>
            <Button className="w-[300px] h-[50px] border-white border font-bold" onClick={() => nav(routes.SCREEN_GUEST_SESSION)}>Guest Login</Button>
            <div className="font-bold text-white">Guest login valid for 24 hours only</div>
            <div className="font-bold text-white">login from TMDB to access watchlist and favorites</div>
        </div>
    )
}

export default LoginPage