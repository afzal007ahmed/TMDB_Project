import { combineEpics } from "redux-observable";
import epicRequestToken from "./RequestTokenRedux/ecpiRequestToken";
import epicSessionId from "./Pages/RedirectPage/redux/epicSessionId";
import epicUserDetails from "./Pages/HomeScreen/redux/epicUserDetails";
import epicTrendings from "./Pages/HomeScreen/components/Trending/redux/epicTrending";
import epicPopularMovies from "./Pages/HomeScreen/components/Movies/Popular/redux/epicPopularMovies";
import epicTopRatedMovies from "./Pages/HomeScreen/components/Movies/TopRated/redux/epicTopRated";
import epicStreamingMovies from "./Pages/HomeScreen/components/Movies/Streaming/redux/epicStreamingMovies";
import epicUpcomingMovies from "./Pages/HomeScreen/components/Movies/Upcoming/redux/epicUpcomingMovies";
import epicPopularMovies2 from "./Pages/ScreenMovies/redux/epicPopularMovies";
import epicTopRatedMovies2 from "./Pages/ScreenMovies/redux/epicTopRatedMovies";
import epicUpcomingMovies2 from "./Pages/ScreenMovies/redux/epicUpcomingMovies";
import epicNowPlayingMovies from "./Pages/ScreenMovies/redux/epicNowPlayingMovies";
import epicPopularPeople from "./Pages/HomeScreen/components/PopularPeople/redux/ecpiPopularPeople";
import epicPersonalDetails from "./Pages/ScreenProfile/redux/epicSingleProfile";
import epicMoviesDone from "./Pages/ScreenProfile/redux/epicMoviesDone";
import epicTimeLine from "./Pages/ScreenProfile/redux/epicTimeLine";
import epicMovieDetails from "./Pages/ScreenSingleMovie/redux/epicMovieDetails";
import epicMovieCredits from "./Pages/ScreenSingleMovie/redux/epicMovieCredits";
import epicMovieReviews from "./Pages/ScreenSingleMovie/redux/epicMovieReviews";
import epicAddtoFav from "./Pages/ScreenSingleMovie/redux/epicAddtoFav";
import epicAccountStates from "./Pages/ScreenSingleMovie/redux/epicAccountStates";
import epicaddToWatchlist from "./Pages/ScreenSingleMovie/redux/epicAddtoWatchlist";
import epicAccountStatesforWatchlist from "./Pages/ScreenSingleMovie/redux/epicAccountStatesforWatchlist";
import epicTvDetails from "./Pages/SinglePageTv/redux/epicTvDetails";
import epicTvCast from "./Pages/SinglePageTv/redux/epicTvCast";
import epicTvReviews from "./Pages/SinglePageTv/redux/epicTvReviews";
import epicAccountStatesforWatchlistTv from "./Pages/SinglePageTv/redux/epicAccountStatesforWatchlistTv";
import epicAccountStatesTv from "./Pages/SinglePageTv/redux/epicAccountStatesTv";
import epicGuestSessionId from "./Pages/RedirectPage/redux/epicGuestSessionId";
import epicTv from "./Pages/ScreenTv/redux/epicTv";
import epicPeople from "./Pages/ScreenPeople/redux/epicPeople";
import epicAddRatingTv from "./Pages/SinglePageTv/redux/epicAddRating";
import epicAccountStatesfoRating from "./Pages/SinglePageTv/redux/epicAccountStatesforRating";
import epicAddRatingMovie from "./Pages/ScreenSingleMovie/redux/epicAddRating";
import epicAccountStatesfoRatingMovie from "./Pages/ScreenSingleMovie/redux/epicAccountStatesforRating";

const Epics = combineEpics(
    epicRequestToken,
    epicSessionId,
    epicUserDetails,
    epicTrendings,
    epicPopularMovies,
    epicTopRatedMovies,
    epicStreamingMovies,
    epicUpcomingMovies,
    epicPopularMovies2,
    epicTopRatedMovies2,
    epicUpcomingMovies2,
    epicNowPlayingMovies,
    epicPopularPeople,
    epicPersonalDetails,
    epicMoviesDone,
    epicTimeLine,
    epicMovieDetails,
    epicMovieCredits,
    epicMovieReviews,
    epicAddtoFav,
    epicAccountStates,
    epicaddToWatchlist,
    epicAccountStatesforWatchlist,
    epicTvDetails,
    epicTvCast,
    epicTvReviews,
    epicAccountStatesforWatchlistTv,
    epicAccountStatesTv,
    epicGuestSessionId,
    epicTv,
    epicPeople,
    epicAddRatingTv,
    epicAccountStatesfoRating,
    epicAddRatingMovie,
    epicAccountStatesfoRatingMovie
)


export default Epics