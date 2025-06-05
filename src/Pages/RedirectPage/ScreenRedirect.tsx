import type { RootState } from "@/rootReducers";
import routes from "@/RouteManagement/routes";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { fetchSessionId } from "./redux/sliceSessionId";

const ScreenRedirect = () => {

    const dispatch = useDispatch();
    const sessionId = useSelector((state: RootState) => state.reducerSessionId);
    const nav = useNavigate();
    useEffect(() => {
            document.title = 'Login Successful';
            toast.custom(() =>
                <div className="font-bold text-green-600 flex gap-4 shadow-md p-4 rounded-lg bg-white"><CheckCircle /> <span>Granted Access</span></div>
            )
            if (localStorage.getItem('sessionId')) {
                nav(routes.SCREEN_HOME);
            }
            else {
                setTimeout(() => {
                    dispatch(fetchSessionId({}));
                }, 50)
            }
    }, [])

    useEffect(() => {
        if (sessionId.session_id !== null) {
            localStorage.setItem('sessionId', sessionId.session_id);
            toast.custom(() =>
                <div className="font-bold text-green-600 flex gap-4 shadow-md p-4 rounded-lg bg-white"><CheckCircle /> <span>Session Generated Successfully</span></div>
            )
            nav(routes.SCREEN_HOME);
        }
    }, [sessionId.session_id])


    console.log(sessionId);
    return (
        <div className="bg-[#0D253F] h-screen text-white font-bold text-2xl flex items-center justify-center">
            {sessionId.loading && <div className="flex gap-4 text-2xl"><span>Generating Session Key</span> <Loader2 className="animate-spin" /></div>}
            {!sessionId.loading && sessionId.error !== null && <div className="font-bold text-red text-2xl flex gap-4 items-center"><XCircle className="text-red-600" size={30} />
                <div>
                    <div>{sessionId.error}</div>
                    <div className="text-sm">Redirecting Again...</div>
                </div>
            </div>}
        </div>
    )
}

export default ScreenRedirect