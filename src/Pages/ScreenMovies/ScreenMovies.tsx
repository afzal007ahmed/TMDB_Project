import { useParams } from "react-router-dom"
import PopularMovies2 from "./components/PopularMovies2";
import { TopRatedMovies2 } from "./components/TopRatedMovies2";
import UpcomingMovies2 from "./components/UpcomingMovies2";
import NowPlayingMovies from "./components/NowPlayingMovies";

const ScreenMovies = () => {
  const { category } = useParams() ;
 
    return (
        <div className="w-full max-w-[1400px] mx-auto lg:p-24 md:p-12 p-2  ">
            { category === 'Popular' && <PopularMovies2/>}
            { category === 'Top Rated' && <TopRatedMovies2/>}
            { category === 'Upcoming' && <UpcomingMovies2/>}
            { category === 'Now Playing' && <NowPlayingMovies/>}
        </div>
  )
}

export default ScreenMovies