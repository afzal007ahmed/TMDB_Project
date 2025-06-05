import { toast, Toaster } from "sonner"
import RouteManagement from "./RouteManagement/RouteManagement"
import NavBar from "./NavBar/NavBar"
import { useNavigate } from "react-router-dom"
import routes from "./RouteManagement/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./rootReducers";
import { clearStateRequestToken } from "./RequestTokenRedux/sliceRequestToken";
import { clearStateSessionId } from "./Pages/RedirectPage/redux/sliceSessionId";
import { fetchUserDetails } from "./Pages/HomeScreen/redux/sliceUserDetails";

function App() {
  const nav = useNavigate();
  const sessionId = useSelector((state: RootState) => state.reducerSessionId);
  const requestToken = useSelector((state: RootState) => state.reducerRequestToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionId.error || requestToken.error) {
      setTimeout(() => {
        dispatch(clearStateRequestToken({}));
        dispatch(clearStateSessionId({}));
        localStorage.removeItem('requestToken');
        localStorage.removeItem('sessionId');
        nav(routes.SCREEN_TOKEN_GENERATE)
      }, 5000);
    }
  }, [sessionId.error]);
  useEffect(() => {
   if( localStorage.getItem('requestToken') && localStorage.getItem('sessionId') ) {
    toast.custom(() => <div className="font-bold text-green-600 flex gap-4 shadow-md p-4 rounded-lg bg-white"><span>Welcome back!</span></div>)
    dispatch(fetchUserDetails({})) ;
   }
  } ,[])
   
  const date = new Date() ;
  if( localStorage.getItem('expiry')){
    if( !localStorage.getItem('expiry')){
      localStorage.removeItem('guestSessionId') ;
      nav( routes.SCREEN_LOGIN) ;
      return ;
    }
    const expiry = new Date( localStorage.getItem('expiry') as string) ;
    if( date >= expiry ) {
      toast.custom(() => <div className="font-bold text-red-600 flex gap-4 shadow-md p-4 rounded-lg bg-white"><span>Guest Session Expired</span></div> )
      localStorage.removeItem('expiry') ;
      localStorage.removeItem('guestSessionId')
      nav(routes.SCREEN_LOGIN) ;
    }
  }
  return (
    <div>
      <Toaster />
      <NavBar />
      <RouteManagement />
    </div>
  )
}

export default App
