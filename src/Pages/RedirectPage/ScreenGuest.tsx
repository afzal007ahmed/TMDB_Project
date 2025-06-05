import type { RootState } from "@/rootReducers"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchGuestSessionId } from "./redux/sliceGuestSessionId";
import { useNavigate } from "react-router-dom";
import routes from "@/RouteManagement/routes";
import { CheckCircle } from "lucide-react";

const ScreenGuest = () => {
    const guestId = useSelector((state: RootState) => state.reducerGuestSessionId);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchGuestSessionId({}));
    }, [])
    const nav = useNavigate();
    useEffect(() => {
        if (guestId.session_id && guestId.expiry_date) {
            localStorage.setItem('guestSessionId', guestId.session_id);
            localStorage.setItem('expiry', guestId.expiry_date);
            setTimeout(() => {
                nav(routes.SCREEN_HOME);
            }, 2000)
        }
    }, [guestId.session_id])
    return (
        <div className='min-h-[calc(100vh-55px)] bg-[#0D253F] flex items-center justify-center text-white'>
            {guestId.loading && <div className="flex flex-col items-center font-bold"><div className="flex items-center gap-4 font-bold text-2xl"> <span>Generating Session Id...</span></div></div>}
            {guestId.session_id && <div className="flex flex-col items-center font-bold"><div className="flex items-center gap-4 font-bold text-2xl"><CheckCircle className='text-green-600 font-bold' size={50} /> <span>Session Id Generated Successfully</span></div> <span>Redirecting to the Home Page...</span></div>}
        </div>
    )
}

export default ScreenGuest