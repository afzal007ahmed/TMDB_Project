import { Route, Routes } from 'react-router-dom' 
import routes from './routes'
import ScreenTokenGenerating from '@/Pages/ScreenTokenGenetating/ScreenTokenGenerating'
import ScreenRedirect from '@/Pages/RedirectPage/ScreenRedirect'
import ScreenHome from '@/Pages/HomeScreen/ScreenHome'
import ScreenMovies from '@/Pages/ScreenMovies/ScreenMovies'
import ScreenSingleMovie from '@/Pages/ScreenSingleMovie/ScreenSingleMovie'
import ScreenProfile from '@/Pages/ScreenProfile/ScreenProfile'
import ScreenSinglePageTv from '@/Pages/SinglePageTv/ScreenSinglePageTv'
import LoginPage from '@/Pages/LoginPage/LoginPage'
import ScreenGuest from '@/Pages/RedirectPage/ScreenGuest'
import ScreenTv from '@/Pages/ScreenTv/ScreenTv'
import ScreenPeople from '@/Pages/ScreenPeople/ScreenPeople'
const RouteManagement = () => {
  return (
    <Routes>
        <Route path={routes.SCREEN_TOKEN_GENERATE} element={<ScreenTokenGenerating/>}/>
        <Route path={routes.SCREEN_APPROVED} element={<ScreenRedirect/>}/>
        <Route path={routes.SCREEN_HOME} element={<ScreenHome/>}/>
        <Route path={routes.SCREEN_MOVIES} element={<ScreenMovies/>} />
        <Route path={routes.SCREEN_MOVIE} element={<ScreenSingleMovie/>} />
        <Route path={routes.SCREEN_PROFILE} element={<ScreenProfile/>}/>
        <Route path={routes.SCREEN_TV} element={<ScreenSinglePageTv/>} />
        <Route path={routes.SCREEN_LOGIN} element={<LoginPage/>} />
        <Route path={routes.SCREEN_GUEST_SESSION} element={<ScreenGuest/>} />
        <Route path={routes.SCREEN_TV_LIST} element={<ScreenTv/>} />
        <Route path={routes.SCREEN_PEOPLE } element={<ScreenPeople/>} />
    </Routes>
  )
}

export default RouteManagement