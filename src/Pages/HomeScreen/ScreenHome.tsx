import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUserDetails } from "./redux/sliceUserDetails"
import { useNavigate } from "react-router-dom"
import routes from "@/RouteManagement/routes"
import Trending from "./components/Trending/Trending"
import Movies from "./components/Movies/Movies"
import PopularPeople from "./components/PopularPeople/PopularPeople"
import { clearStateNowPlayingMovies } from "../ScreenMovies/redux/sliceNowPlayingMovies"
import { clearStatePopularMovies } from "./components/Movies/Popular/redux/slicePopularMovies"
import { clearStateStreaming } from "./components/Movies/Streaming/redux/sliceStreamingMovies"
import { clearStateTopRatedMovies } from "./components/Movies/TopRated/redux/sliceTopRated"
import { clearStateUpcomingMovies } from "./components/Movies/Upcoming/redux/sliceUpcomingMovies"
import { clearStateTrending } from "./components/Trending/redux/sliceTrending"
const ScreenHome = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    document.title = 'Home'
    if ((!localStorage.getItem('requestToken') || !localStorage.getItem('sessionId')) && !localStorage.getItem('guestSessionId')) {
      localStorage.removeItem('requestToken');
      localStorage.removeItem('sessionId');
      nav(routes.SCREEN_LOGIN)
    }
    if ((localStorage.getItem('requestToken') && localStorage.getItem('sessionId'))) {
      dispatch(fetchUserDetails({}));
    }
    return(() => {
      dispatch(clearStateNowPlayingMovies({})) ;
      dispatch(clearStatePopularMovies({}));
      dispatch( clearStateStreaming({})) ;
      dispatch(clearStateTopRatedMovies({}));
      dispatch(clearStateUpcomingMovies({})) ;
      dispatch(clearStateTrending({})) ;
    })
  }, [])
  return (
    <div>
      <div className="bg-gray-300 flex justify-center">
        <div className="text-white font-bold lg:p-24 max-w-[1400px] w-full p-12">
          <div className="text-4xl">Welcome.</div>
          <div className="text-2xl">Millions of movies, TV shows and people to discover. Explore now.</div>
        </div>
      </div>
      <div>
        <Trending/>
      </div>
      <div>
        <Movies/>
      </div>
      <div>
        <PopularPeople/>
      </div>
    </div>
  )
}

export default ScreenHome