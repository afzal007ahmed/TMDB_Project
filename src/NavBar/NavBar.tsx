import {  CheckCircle, UserCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/rootReducers"
import { clearStateRequestToken } from "@/RequestTokenRedux/sliceRequestToken"
import { clearStateUserDetails } from "@/Pages/HomeScreen/redux/sliceUserDetails"
import { clearStateSessionId } from "@/Pages/RedirectPage/redux/sliceSessionId"
import { useNavigate } from "react-router-dom"
import routes from "@/RouteManagement/routes"
import { toast } from "sonner"

const NavBar = () => {
    const userDetails = useSelector((state: RootState) => state.reducerUserDetails);
    const dispatch = useDispatch();
    const nav = useNavigate();
    function handleLogout() {
        localStorage.removeItem('requestToken');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('guestSessionId');
        localStorage.removeItem('expiry');
        dispatch(clearStateRequestToken({}));
        dispatch(clearStateUserDetails({}));
        dispatch(clearStateSessionId({}));
        toast.custom(() => <div className="font-bold text-green-600 flex gap-4 shadow-md p-4 rounded-lg bg-white"><CheckCircle /> <span>Logged out</span></div>)
        setTimeout(() => {
            nav(routes.SCREEN_LOGIN);
        }, 2000)

    }
    return (
        <div className="bg-[#0D253F]">
            <div className="py-5 text-white font-bold  text-sm flex  justify-between max-w-[1400px] mx-auto w-full lg:px-24 md:px-12 p-2">
                <div className="md:flex gap-6 items-center hidden cursor-pointer">
                    <img src="/logo.svg" className="w-[160px]" onClick={() => nav(routes.SCREEN_HOME)} />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">Movies</DropdownMenuTrigger>
                        <DropdownMenuContent className="font-medium">
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_MOVIES.slice(0, routes.SCREEN_MOVIES.length - 9) + 'Popular')}>Popular</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_MOVIES.slice(0, routes.SCREEN_MOVIES.length - 9) + 'Top Rated')}>Top Rated</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_MOVIES.slice(0, routes.SCREEN_MOVIES.length - 9) + 'Now Playing')}>Now Playing</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_MOVIES.slice(0, routes.SCREEN_MOVIES.length - 9) + 'Upcoming')}>Upcoming</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">TV Shows</DropdownMenuTrigger>
                        <DropdownMenuContent className="font-medium">
                        <DropdownMenuItem onClick={() => nav(routes.SCREEN_TV_LIST.slice(0,routes.SCREEN_TV_LIST.length - 9 ) + 'popular')}>Popular</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_TV_LIST.slice(0,routes.SCREEN_TV_LIST.length - 9 ) + 'top_rated')}>Top Rated</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_TV_LIST.slice(0,routes.SCREEN_TV_LIST.length - 9 ) + 'on_the_air')}>On The Air</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_TV_LIST.slice(0,routes.SCREEN_TV_LIST.length - 9 ) + 'airing_today')}>Airing Today</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">People</DropdownMenuTrigger>
                        <DropdownMenuContent className="font-medium">
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_PEOPLE)}>Popular People</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <img src="/logo.svg" className="w-[160px] md:hidden" onClick={() => nav(routes.SCREEN_HOME)}  />
                <div className="flex gap-6 items-center cursor-pointer">
                     { (userDetails.id || localStorage.getItem('guestSessionId')) && <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer"><UserCircle /></DropdownMenuTrigger>
                        <DropdownMenuContent className="cursor-pointer font-bold">
                            <DropdownMenuItem className="font-bold">Hi , {userDetails.username || 'Guest'}</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 font-bold">Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>}
                </div>
                <div className="flex gap-6 items-center justify-around fixed bottom-0 z-4 bg-[#0D253F] w-full left-0 p-5 md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">Movies</DropdownMenuTrigger>
                        <DropdownMenuContent className="font-medium">
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_MOVIES.slice(0, routes.SCREEN_MOVIES.length - 9) + 'Popular')}>Popular</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_MOVIES.slice(0, routes.SCREEN_MOVIES.length - 9) + 'Top Rated')}>Top Rated</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_MOVIES.slice(0, routes.SCREEN_MOVIES.length - 9) + 'Now Playing')}>Now Playing</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_MOVIES.slice(0, routes.SCREEN_MOVIES.length - 9) + 'Upcoming')}>Upcoming</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">TV Shows</DropdownMenuTrigger>
                        <DropdownMenuContent className="font-medium">
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_TV_LIST.slice(0,routes.SCREEN_TV_LIST.length - 9 ) + 'popular')}>Popular</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_TV_LIST.slice(0,routes.SCREEN_TV_LIST.length - 9 ) + 'top_rated')}>Top Rated</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_TV_LIST.slice(0,routes.SCREEN_TV_LIST.length - 9 ) + 'on_the_air')}>On The Air</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_TV_LIST.slice(0,routes.SCREEN_TV_LIST.length - 9 ) + 'airing_today')}>Airing Today</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">People</DropdownMenuTrigger>
                        <DropdownMenuContent className="font-medium">
                            <DropdownMenuItem onClick={() => nav(routes.SCREEN_PEOPLE)}>Popular People</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>

    )
}

export default NavBar
