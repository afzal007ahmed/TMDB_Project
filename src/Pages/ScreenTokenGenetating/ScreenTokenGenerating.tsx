import type { RootState } from "@/rootReducers";
import { CheckCircle, Loader2 } from "lucide-react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchRequestToken } from "@/RequestTokenRedux/sliceRequestToken";
import { toast } from "sonner";

const ScreenTokenGenerating = () => {

  const dispatch = useDispatch();
  const requestToken = useSelector((state: RootState) => state.reducerRequestToken);
  useEffect(() => {
    document.title = 'Genrating Token'
     dispatch(fetchRequestToken({}));
  }, [])
  useEffect(() => {
    if (!requestToken.loading && requestToken.token) {
      localStorage.setItem('requestToken', requestToken.token);
      toast.custom(() =>
        <div className="font-bold text-green-600 flex gap-4 shadow-md p-4 rounded-lg bg-white"><CheckCircle /> <span>Token Generated Successfully</span></div>
      )
      setTimeout(() => {
        const redirectUrl = window.location.href.slice(0 , window.location.href.length - 5 ) + 'approved';
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.token}?redirect_to=${redirectUrl}`
      }, 2000)
    }
  }, [requestToken.token])
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#0D253F] text-white">
      {requestToken.loading && <Loader2 className="animate-spin lg:w-[50px] lg:h-[50px] md:w-[30px] md:h-[30px] w-[20px] h-[20px]" />}
      {((!requestToken.loading && requestToken.token !== null) || localStorage.getItem('requestToken') !== null) && <div className="flex flex-col items-center font-bold"><div className="flex items-center gap-4 font-bold text-2xl"><CheckCircle className='text-green-600 font-bold' size={50} /> <span>Request Token Generated Successfully</span></div> <span>Redirecting to the Login Page...</span></div>}
    </div>
  )
}

export default ScreenTokenGenerating