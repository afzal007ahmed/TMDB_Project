import type { RootState } from "@/rootReducers"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { clearStateTvDetails, fetchTvDetails } from "./redux/sliceTvDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { Heart, Plus, Star } from "lucide-react";
import { dateMapping } from "../HomeScreen/components/Trending/utils/utils";
import { clearStateTvCast, fetchTvCast } from "./redux/sliceTvCast";
import { motion } from "framer-motion";
import routes from "@/RouteManagement/routes";
import { clearStateTvReviews, fetchTvReviews } from "./redux/sliceTvReviews";
import { clearStateAccountStatesTv, fetchAccountStatesTv } from "./redux/sliceAccountStates";
import { clearStateAccountStatesWatchlistTv, fetchAccountStatesWatchlistTv } from "./redux/sliceAccountStatesforWatchlist";
import { clearStateAddtoWatchlist, fetchAddtoWatchlist } from "../ScreenSingleMovie/redux/sliceAddtoWatchlist";
import { clearStateAddtoFav, fetchAddtoFav } from "../ScreenSingleMovie/redux/sliceAddtoFav";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { clearStateAccountStatesforRating, fetchAccountStatesforRating } from "./redux/sliceAccountStatesforRating";
import { clearStateAddRatingTv, fetchAddRatingTv } from "./redux/sliceAddRating";
const ScreenSinglePageTv = () => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [rate, setRate] = useState('0');
    const date = new Date();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const addToFav = useSelector((state: RootState) => state.reducerAddtoFav);
    const accountStateforRating = useSelector((state: RootState) => state.reducerAccountStatesforRating)
    const addToWatchlist = useSelector((state: RootState) => state.reducerAddtoWatchList);
    const accountStateforWatchlist = useSelector((state: RootState) => state.reducerAccountStatesforWatchlistTv);
    const accountStates = useSelector((state: RootState) => state.reducerAccountStatesTv);
    const tvCast = useSelector((state: RootState) => state.reducerTvCast);
    const tvReviews = useSelector((state: RootState) => state.reducerTvReviews);
    const tvDetails = useSelector((state: RootState) => state.reducerTvDetails);
    const userDetails = useSelector((state: RootState) => state.reducerUserDetails);
    const addRating = useSelector((state: RootState) => state.reducerAddRatingTv);
    useEffect(() => {
        if (addRating.success) {
            dispatch(fetchAccountStatesforRating({ media_id: Number(id as string), session_id: localStorage.getItem('sessionId'), guest_sesson_id: localStorage.getItem('guestSessionId') }))
        }
    }, [addRating.success])
    useEffect(() => {
        document.title = 'Loading...'
        dispatch(fetchTvCast(id as string))
        dispatch(fetchTvDetails(id as string));
        dispatch(fetchTvReviews(id as string));
        dispatch(fetchAccountStatesforRating({ media_id: Number(id as string), session_id: localStorage.getItem('sessionId') || null, guest_sesson_id: localStorage.getItem('guestSessionId') || null }))
        if (localStorage.getItem('sessionId')) {
            dispatch(fetchAccountStatesTv({ media_id: Number(id), session_id: localStorage.getItem('sessionId') as string }));
            dispatch(fetchAccountStatesWatchlistTv({ media_id: Number(id), session_id: localStorage.getItem('sessionId') as string }));
        }
        return (() => {
            dispatch(clearStateAddtoFav({}));
            dispatch(clearStateAddtoWatchlist({}));
            dispatch(clearStateAccountStatesTv({}));
            dispatch(clearStateAccountStatesWatchlistTv({}));
            dispatch(clearStateTvCast({}));
            dispatch(clearStateTvDetails({}));
            dispatch(clearStateTvReviews({}));
            dispatch(clearStateAccountStatesforRating({})) ;
            dispatch(clearStateAddRatingTv({})) ;
        })
    }, [id])

    useEffect(() => {
        if (addToFav.success) {
            dispatch(fetchAccountStatesTv({ media_id: Number(id), session_id: localStorage.getItem('sessionId') as string }));
        }
    }, [addToFav.success])

    useEffect(() => {
        if (addToWatchlist.success) {
            dispatch(fetchAccountStatesWatchlistTv({ media_id: Number(id), session_id: localStorage.getItem('sessionId') as string }));
        }
    }, [addToWatchlist.success])
    useEffect(() => {
        if (tvDetails.details) {
            document.title = tvDetails.details.name || tvDetails.details.original_name
        }
    }, [tvDetails.details])
    useEffect(() => {
        if( accountStateforRating.result && (accountStateforRating.result.rated as {value : number}).value ) {
            setRate(((accountStateforRating.result.rated as {value : number}).value * 10 ).toString()) ;
        }
    } , [accountStateforRating.result])
    return (
        <div>
            <div className="relative">
                <div
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${tvDetails.details?.backdrop_path || ""})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                    className="w-full absolute top-0 left-0 h-full -z-1 opacity-65"
                ></div>

                <div className={`max-w-[1400px] mx-auto md:px-12 lg:px-24 py-6 flex gap-12 flex-wrap pb-24 px-6`}>
                    <div className="flex justify-center w-full md:w-auto">
                        {tvDetails.details?.poster_path && (
                            <img src={`https://image.tmdb.org/t/p/w500${tvDetails.details.poster_path}`} className="w-[250px] rounded-md object-cover" />
                        )}
                        {tvDetails.loading && <Skeleton className="w-[250px] h-[350px]" />}
                    </div>

                    <div className="flex-1">
                        {tvDetails.loading && <Skeleton className="w-[200px] h-[20px] mb-8" />}
                        {tvDetails.loading && <Skeleton className="w-[50px] h-[50px] mb-8 rounded-[50px]" />}
                        {tvDetails.loading && <Skeleton className="w-[200px] h-[20px] mb-8" />}
                        {tvDetails.loading && <Skeleton className="w-[200px] h-[20px] mb-5" />}
                        {tvDetails.loading && <Skeleton className="w-[200px] h-[20px] mb-8" />}

                        {tvDetails.details && (
                            <div>
                                <div className="font-bold text-3xl text-white">{tvDetails.details.original_name || tvDetails.details.name}</div>

                                <div className="relative my-5 h-[80px]">
                                    <div className="absolute top-0 left-0">
                                        <CircularProgressbar
                                            value={Math.round((tvDetails.details.vote_average || 0) * 10)}
                                            styles={buildStyles({
                                                pathColor:
                                                    Math.round((tvDetails.details.vote_average || 0) * 10) >= 70
                                                        ? "#00ff88"
                                                        : Math.round((tvDetails.details.vote_average || 0) * 10) >= 50
                                                            ? "yellow"
                                                            : "red",
                                                trailColor: "gray",
                                            })}
                                            className="w-[70px] h-[70px]"
                                        />
                                    </div>
                                    <div className="bg-black w-[60px] h-[60px] rounded-[60px] absolute top-[5px] left-[5px] text-white font-bold text-2xl flex items-center justify-center">
                                        {Math.round((tvDetails.details.vote_average || 0) * 10)} <sup className="text-xs">%</sup>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {userDetails.id &&
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="border border-black rounded-4xl p-2 flex items-center justify-center cursor-pointer bg-black" onClick={() => dispatch(fetchAddtoFav({ id: userDetails.id as string, session_id: localStorage.getItem('sessionId') as string, media_type: 'tv', media_id: Number(id as string), favorite: !accountStates.result?.favorite }))}>
                                                    <Heart size={16} style={{ fill: accountStates.result?.favorite ? "red" : "white" }} />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-xs my-1 bg-white font-bold p-1 rounded-lg">{accountStates.result?.favorite ? 'Remove from favorites' : 'Add to favorite'}</p>
                                            </TooltipContent>
                                        </Tooltip>}
                                    {userDetails.id &&
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="border border-black rounded-4xl p-2 flex items-center justify-center cursor-pointer bg-black" onClick={() => dispatch(fetchAddtoWatchlist({ id: userDetails.id as string, session_id: localStorage.getItem('sessionId') as string, media_type: 'tv', media_id: Number(id as string), watchlist: !accountStateforWatchlist.result?.watchlist }))}>
                                                    <Star size={18} className={`${accountStateforWatchlist.result?.watchlist ? 'fill-yellow-500' : 'fill-white'}`} />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-xs my-1 bg-white font-bold p-1 rounded-lg">{accountStateforWatchlist.result?.watchlist ? 'Remove from watchlist' : 'Add to Watchlist'}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    }
                                    { localStorage.getItem('sessionId') && <Dialog open={open} onOpenChange={(val) => {
                                        if (!val && !accountStateforRating.result?.rated ) {
                                            setRate('');
                                        }
                                        setOpen(val);
                                    }}>
                                        <DialogTrigger className="cursor-pointer">
                                            <div className="font-bold text-white bg-black p-2 rounded-4xl flex items-center gap-2 cursor-pointer text-sm" onClick={() => setOpen(true)}>
                                                {!accountStateforRating.result?.rated && !accountStateforRating.loading && 'Add Rating'} {!accountStateforRating.result?.rated && <Plus size={16} />} {accountStateforRating.result?.rated && (accountStateforRating.result?.rated as { value: number }).value && <span className={`${(accountStateforRating.result?.rated as { value: number }).value * 10 >= 70 ? 'text-[#00ff88]' : (accountStateforRating.result?.rated as { value: number }).value * 10 >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{(accountStateforRating.result?.rated as { value: number }).value * 10} <sup>%</sup></span>}
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle></DialogTitle>
                                            <DialogDescription>Rating takes some seconds to get reflected by TMDB , wait ( 10 -15 seconds ) and refresh again</DialogDescription>
                                            <div>
                                                <div className="font-bold text-sm mb-2">Please Rate (rating will be automatically converted to the nearest multiple of 0.5)</div>
                                                <Input value={rate} onChange={(e) => { if (Number(e.target.value) > 100) { return }; setRate(e.target.value) }} type="number" />
                                                <div className="font-bold text-white mt-3">{Number(rate) / 10 >= 7 ? <span className="bg-green-600 p-2 rounded-2xl">Good</span> : Number(rate) / 10 >= 5 ? <span className="bg-orange-600 p-2 rounded-2xl">Average</span> : <span className="bg-red-600 p-2 rounded-2xl">poor</span>}</div>
                                                <div className="relative my-5 h-[80px]">
                                                    <div className="absolute top-0 left-0">
                                                        <CircularProgressbar
                                                            value={Number(rate)}
                                                            styles={buildStyles({
                                                                pathColor:
                                                                    Number(rate || '0') >= 70
                                                                        ? "#00ff88"
                                                                        : Number(rate || '0') >= 50
                                                                            ? "yellow"
                                                                            : "red",
                                                                trailColor: "gray",
                                                            })}
                                                            className="w-[70px] h-[70px]"
                                                        />
                                                    </div>
                                                    <div className="bg-black w-[60px] h-[60px] rounded-[60px] absolute top-[5px] left-[5px] text-white font-bold text-2xl flex items-center justify-center">
                                                        {rate} <sup className="text-xs">%</sup>
                                                    </div>
                                                </div>
                                                <Button onClick={() => { if (rate.length != 0 && Number(rate) <= 100) { setOpen(false); dispatch(fetchAddRatingTv({ value: Math.round((Number(rate) / 10) * 2) / 2, series_id: id as string, id_type: localStorage.getItem('sessionId') ? 'user' : localStorage.getItem('guestSessionId') ? 'guest' : '', id: localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') as string : localStorage.getItem('guestSessionId') as string })); setRate('') } }}>Add Rating</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>}
                                </div>

                                <div className="mt-12">
                                    <div className="text-lg font-bold text-white">Overview</div>
                                    <div className="font-bold text-white">{tvDetails.details.overview}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div className="max-w-[1400px] mx-auto md:px-12 lg:px-24 py-6 flex gap-2 pb-24 px-6 min-w-0 items-start flex-col md:flex-row">
                    <div className="max-w-[1000px] min-w-0 w-full">
                        <div className="relative">
                            <div className="text-xl font-bold">Cast</div>
                            <div className="flex items-stretch gap-4 overflow-x-auto scrollbar-hide mt-12 min-h-[340px] min-w-0 w-full">
                                {tvCast.loading &&
                                    Array.from({ length: 7 }).map((_, index) => (
                                        <div className="w-[150px] h-[350px]" key={index}>
                                            <Skeleton className="w-[150px] h-[220px]" />
                                        </div>
                                    ))}

                                {!tvCast.loading &&
                                    tvCast.cast?.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            onClick={() =>
                                                item.id &&
                                                nav(`${routes.SCREEN_PROFILE.slice(0, routes.SCREEN_PROFILE.length - 3)}${item.id}`)
                                            }
                                        >
                                            <div className="z-2 cursor-pointer shrink-0">
                                                <div>
                                                    {item.profile_path && (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                                                            className="w-[150px] h-[220px] object-cover object-center rounded-lg"
                                                            alt={item.name || "Actor"}
                                                        />
                                                    )}
                                                </div>
                                                <div className="my-2">
                                                    <div className="text-sm font-bold break-all w-[150px]">{item.name}</div>
                                                    <div className="text-sm">{item.roles[0].character}</div>
                                                    <div className="text-sm font-medium">{item.total_episode_count} episodes</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                {
                                    tvCast.cast?.length === 0 && <div>cast is not available.</div>
                                }
                            </div>
                            <div className="absolute w-[40px] bg-gradient-to-l from-white to-transparent top-0 h-full -right-1"></div>
                        </div>

                        {/* reviews */}
                        <div className="font-bold text-xl my-4">Reviews</div>
                        <div className="min-h-[200px]">
                            {tvReviews.loading && (
                                <div>
                                    <Skeleton className="h-[100px] w-full" />
                                    <Skeleton className="h-[100px] w-full my-4" />
                                </div>
                            )}

                            {tvReviews.reviews?.map((item, index) => (
                                <div className="my-5 border shadow-lg p-8 rounded-md" key={index}>
                                    <div className="flex gap-4">
                                        {item.author_details?.avatar_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${item.author_details.avatar_path}`}
                                                className="h-[60px] w-[60px] rounded-[60px] object-cover shrink-0"
                                            />
                                        ) : (
                                            <div className="bg-[#805BE7] flex items-center justify-center w-[60px] h-[60px] border rounded-[60px] shrink-0 font-bold text-white">
                                                {item.author_details?.name?.[0]?.toUpperCase() || "A"}
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-bold text-xl">A review by {item.author_details?.name || "Anonymous"}</div>
                                            <div className="flex gap-3 items-start">
                                                <div className="flex items-center gap-1 bg-black w-[50px] rounded-md text-white px-1 font-bold justify-center">
                                                    <Star size={12} className="fill-white" />
                                                    <span className="text-[14px]">
                                                        {item.author_details?.rating ? Math.round(item.author_details.rating * 10) : "N/A"}
                                                    </span>
                                                </div>
                                                <span className="text-sm">
                                                    Written by <span className="font-medium">{item.author_details?.name || "Anonymous"}</span>{" "}
                                                    {item.created_at && dateMapping[item.created_at.slice(5, 7)]}{" "}
                                                    {item.created_at?.slice(8, 10)} ,{tvDetails.details?.first_air_date?.slice(0, 4)}
                                                </span>
                                            </div>
                                            <div className="mt-3 break-all">{item.content}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {
                                (!tvReviews.reviews || !tvReviews.reviews.length) && !tvReviews.loading && <div>No reviews available.</div>
                            }
                        </div>
                    </div>

                    {/* right sidebar */}
                    <div className="shrink-0 p-2 flex flex-col pt-18 pl-12 min-w-[150px]">
                        <div>
                            <div className="text-sm font-bold">Status</div>
                            <div className="text-xs font-medium">
                                {tvDetails.details?.first_air_date
                                    ? Number(tvDetails.details.first_air_date.slice(0, 4)) <= date.getFullYear() &&
                                        Number(tvDetails.details.first_air_date.slice(5, 7)) <= date.getMonth() + 1 &&
                                        Number(tvDetails.details.first_air_date.slice(7)) <= date.getDate()
                                        ? "Released"
                                        : `Upcoming (${dateMapping[tvDetails.details.first_air_date.slice(5, 7)]} ${tvDetails.details.first_air_date.slice(8)}, ${tvDetails.details.first_air_date.slice(0, 4)})`
                                    : "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-bold mt-12">Original Language</div>
                            <div className="text-xs font-medium">
                                {tvDetails.details?.original_language === "en" ? "English" : tvDetails.details?.original_language || "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-bold mt-12">Next Episode Release Date</div>
                            <div className="text-xs font-medium">
                                {tvDetails.details?.next_episode_to_air?.air_date || "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-bold mt-12">Production Companies</div>
                            <div className="text-xs font-medium flex gap-2 items-center flex-wrap mt-3">
                                {tvDetails.details?.production_companies.map((item, index) => <span key={index}>{item.logo_path && <img src={`https://image.tmdb.org/t/p/original${item.logo_path}`} className="w-[80px]" />}</span>)}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-bold mt-12">Total Episodes</div>
                            <div className="text-xs font-medium flex gap-2 items-center flex-wrap">
                                {tvDetails.details?.number_of_episodes} episodes , ({tvDetails.details?.number_of_seasons} seasons)
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScreenSinglePageTv