import { combineReducers } from '@reduxjs/toolkit';
import reducerRequestToken from './RequestTokenRedux/sliceRequestToken'
import reducerSessionId from '@/Pages/RedirectPage/redux/sliceSessionId'
import reducerUserDetails from '@/Pages/HomeScreen/redux/sliceUserDetails'
import reducertrendings from '@/Pages/HomeScreen/components/Trending/redux/sliceTrending'
import reducerPopularMovies from '@/Pages/HomeScreen/components/Movies/Popular/redux/slicePopularMovies'
import reducerTopRatedMovies from '@/Pages/HomeScreen/components/Movies/TopRated/redux/sliceTopRated'
import reducerStreamingMovies from '@/Pages/HomeScreen/components/Movies/Streaming/redux/sliceStreamingMovies'
import reducerUpcomingMovies from '@/Pages/HomeScreen/components/Movies/Upcoming/redux/sliceUpcomingMovies'
import reducerPopularMovies2 from '@/Pages/ScreenMovies/redux/slicePopularMovies'
import reducerTopRatedMovies2 from '@/Pages/ScreenMovies/redux/sliceTopRatedMovies'
import reducerUpcomingMovies2 from '@/Pages/ScreenMovies/redux/sliceUpcomingMovies'
import reducerNowPlayingMovies from '@/Pages/ScreenMovies/redux/sliceNowPlayingMovies'
import reducerPopularPeople from '@/Pages/HomeScreen/components/PopularPeople/redux/slicePopularPeople'
import reducerPersonalDetails from '@/Pages/ScreenProfile/redux/sliceSingleProfile'
import reducerMoviesDone from '@/Pages/ScreenProfile/redux/sliceMoviesDone'
import reducerTimeline from '@/Pages/ScreenProfile/redux/sliceTimeline'
import reducerMovieDetails from '@/Pages/ScreenSingleMovie/redux/sliceMovieDetails'
import reducerMovieCredits from '@/Pages/ScreenSingleMovie/redux/sliceeMovieCast'
import reducerMovieReviews from '@/Pages/ScreenSingleMovie/redux/sliceMovieReviews'
import reducerAddtoFav from '@/Pages/ScreenSingleMovie/redux/sliceAddtoFav'
import reducerAccountStates from '@/Pages/ScreenSingleMovie/redux/sliceAccountStates'
import reducerAddtoWatchList from '@/Pages/ScreenSingleMovie/redux/sliceAddtoWatchlist'
import reducerAccountStatesforWatchlist from '@/Pages/ScreenSingleMovie/redux/sliceAccountStateforWatchlist'
import reducerTvDetails from '@/Pages/SinglePageTv/redux/sliceTvDetails'
import reducerTvCast from '@/Pages/SinglePageTv/redux/sliceTvCast'
import reducerTvReviews from '@/Pages/SinglePageTv/redux/sliceTvReviews'
import reducerAccountStatesforWatchlistTv from '@/Pages/SinglePageTv/redux/sliceAccountStatesforWatchlist'
import reducerAccountStatesTv from '@/Pages/SinglePageTv/redux/sliceAccountStates'
import reducerGuestSessionId from '@/Pages/RedirectPage/redux/sliceGuestSessionId'
import reducerTv from '@/Pages/ScreenTv/redux/sliceTv'
import reducerPeople from '@/Pages/ScreenPeople/redux/slicePeople'
import reducerAddRatingTv from '@/Pages/SinglePageTv/redux/sliceAddRating'
import reducerAccountStatesforRating from '@/Pages/SinglePageTv/redux/sliceAccountStatesforRating'
import reducerAddRatingMovie from '@/Pages/ScreenSingleMovie/redux/sliceAddRating'
import reducerAccoutStatesforRatingMovie from '@/Pages/ScreenSingleMovie/redux/sliceAccountStateforRating'

const rootReducer = combineReducers({
    reducerRequestToken,
    reducerSessionId,
    reducerUserDetails,
    reducertrendings,
    reducerPopularMovies,
    reducerTopRatedMovies,
    reducerStreamingMovies,
    reducerUpcomingMovies,
    reducerPopularMovies2,
    reducerTopRatedMovies2,
    reducerUpcomingMovies2,
    reducerNowPlayingMovies,
    reducerPopularPeople,
    reducerPersonalDetails,
    reducerMoviesDone,
    reducerTimeline,
    reducerMovieDetails,
    reducerMovieCredits,
    reducerMovieReviews,
    reducerAddtoFav,
    reducerAccountStates,
    reducerAddtoWatchList,
    reducerAccountStatesforWatchlist,
    reducerTvDetails,
    reducerTvCast,
    reducerTvReviews,
    reducerAccountStatesforWatchlistTv,
    reducerAccountStatesTv,
    reducerGuestSessionId,
    reducerTv,
    reducerPeople,
    reducerAddRatingTv,
    reducerAccountStatesforRating,
    reducerAddRatingMovie,
    reducerAccoutStatesforRatingMovie
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer ;