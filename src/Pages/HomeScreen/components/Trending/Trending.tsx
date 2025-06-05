import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending } from "./redux/sliceTrending";
import type { RootState } from "@/rootReducers";
import { Skeleton } from "@/components/ui/skeleton";
import {
    CircularProgressbar,
    buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { dateMapping } from "./utils/utils";
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import routes from "@/RouteManagement/routes";

const Trending = () => {
    const [toggle, setToggle] = useState('day');
    function handleToggle(value: string) {
        if (toggle === value) {
            return;
        }
        setToggle(value);
    }
    const dispatch = useDispatch();
    const trending = useSelector((state: RootState) => state.reducertrendings);
    useEffect(() => {
        dispatch(fetchTrending(toggle));
    }, [toggle])
    const nav = useNavigate();
    return (
        <div className=" mt-12 p-6 md:px-24 md:mt-0 ">
            <div className="bg-[url(bg-music.png))] w-full bg-contain bg-bottom max-w-[1200px] mx-auto pt-24 relative">
                <div className="flex items-strech gap-4 overflow-x-auto scrollbar-hide min-h-[340px]">
                    {
                        trending.loading && Array.from({ length: 7 }).map((_, index) => <div className="w-[150px] h-[300px] shrink-0" key={index}>
                            <Skeleton className="h-full w-full" />
                        </div>)
                    }
                    {
                        !trending.loading && trending.trending && trending.trending.results && trending.trending.results.map((item, index) =>
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <div className="cursor-pointer shrink-0 z-2 relative" onClick={() => {
                                    if (item.media_type === 'tv') {
                                        nav(routes.SCREEN_TV.slice(0, routes.SCREEN_TV.length - 3) + item.id)
                                        return;
                                    }; nav(routes.SCREEN_MOVIE.slice(0, routes.SCREEN_MOVIE.length - 3) + item.id)
                                }}><div>
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}.jpg`} className="w-[150px] h-[220px] object-cover object-center rounded-lg" />
                                        <div className="flex justify-start items-center relative -top-8 left-3">
                                            <div style={{ position: 'relative' }}>
                                                <CircularProgressbar
                                                    value={Math.round(item.vote_average * 10)}
                                                    styles={buildStyles({
                                                        pathColor: Math.round(item?.vote_average * 10) >= 70 ? "#00ff88" : Math.round(item.vote_average * 10) >= 50 ? "yellow" : 'red',
                                                        trailColor: "gray",
                                                    })}
                                                    className="h-[40px] w-[40px]"
                                                />
                                                <div
                                                    className="h-[33px] w-[33px] rounded-[30px]"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '4px',
                                                        left: '4px',
                                                        display: 'flex',
                                                        background: 'black',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    {Math.round(item.vote_average * 10) !== 0 ? Math.round(item.vote_average * 10) : 'NR'}<sup className="text-[6px]">{Math.round(item.vote_average * 10) !== 0 && '%'}</sup>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold break-all w-[150px]">{item.original_name || item.original_title || item.title}</div>
                                        <div className="text-sm">{item.release_date ? dateMapping[item?.release_date?.slice(5, 7)] : (item.first_air_date && dateMapping[item?.first_air_date?.slice(5, 7)])} {item?.release_date?.slice(5, 7) || (item.first_air_date && item?.first_air_date?.slice(5, 7))}, {item?.release_date?.slice(0, 4) || (item.first_air_date && item?.first_air_date?.slice(0, 4))}</div>
                                    </div>
                                </div>
                            </motion.div>)
                    }
                </div>
                <div className="h-[80%] w-[50px] absolute top-16 -right-1 z-3 bg-gradient-to-l from-white to-transparent"></div>
                <div className="h-full w-full bg-white opacity-30 absolute top-0">
                </div>
                <div className="flex border w-[185px] rounded-4xl absolute top-0 bg-white p-1 cursor-pointer text-sm">
                    <div className="rounded-4xl flex items-center" style={{ background: toggle === 'day' ? '#0D253F' : 'white', border: toggle === 'day' ? '1px solid black' : 'none' }} onClick={() => handleToggle('day')}>
                        <div className={`w-full h-full px-4 ${toggle === 'day' && "bg-clip-text text-transparent"} transition-all duration-300 ease-in-out rounded-4xl font-bold ${toggle === 'day' ? "bg-gradient-to-tr from-[#1BD2B0] to-[#06BADA]" : "bg-white"} flex items-center`}>
                            Today
                        </div>
                    </div>
                    <div className="rounded-4xl flex items-center" style={{ background: toggle === 'week' ? '#0D253F' : 'white', border: toggle === 'week' ? '1px solid black' : 'none' }} onClick={() => handleToggle('week')}>
                        <div className={`w-full h-full px-4 transition-all duration-300 ease-in-out ${toggle === 'week' && "bg-clip-text text-transparent"} rounded-4xl font-bold ${toggle === 'week' ? "bg-gradient-to-tr from-[#1BD2B0] to-[#06BADA]" : "bg-white"} flex items-center`}>
                            This Week
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trending