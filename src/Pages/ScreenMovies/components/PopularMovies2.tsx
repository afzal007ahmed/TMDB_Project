import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { clearStatePopularMovies2, fetchPopularMovies2 } from "../redux/slicePopularMovies";
import type { RootState } from "@/rootReducers";
import { motion } from 'framer-motion'
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { dateMapping } from "@/Pages/HomeScreen/components/Trending/utils/utils";
import { Button } from "@/components/ui/button";
import routes from "@/RouteManagement/routes";
import { useNavigate } from "react-router-dom";

const PopularMovies2 = () => {
    const nav = useNavigate() ;
    const dispatch = useDispatch();
    const page = useRef(1);
    const popularMovies = useSelector((state: RootState) => state.reducerPopularMovies2);
    const loadMore = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        document.title = 'Popular Movies'
        dispatch(fetchPopularMovies2(page.current));
        page.current = page.current + 1;
        return(() => {
            dispatch(clearStatePopularMovies2({})) ;
        })
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    dispatch(fetchPopularMovies2(page.current + 1));
                    page.current = page.current + 1;
                }
            }, {
            threshold: 0.01
        }
        )
        if (loadMore.current) {
            observer.observe(loadMore.current);
        }
    } ,[popularMovies.popular_movies])
    return (
        <div>
            <div className="font-bold text-2xl mb-12">Popular Movies</div>
            <div className="flex flex-wrap gap-2 justify-around">
                {
                    popularMovies.popular_movies.length > 0 && popularMovies.popular_movies.map((item, index) => <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={index}
                        transition={{ delay: index * 0.01, duration: 0.3 }}
                        className="shadow-xl border rounded-md cursor-pointer"
                        onClick={() => nav(routes.SCREEN_MOVIE.slice( 0 , routes.SCREEN_MOVIE.length - 3 ) + item.id)}
                    > <div className="shrink-0 rounded-md mb-8">
                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}.jpg`} className="h-[250px] w-[180px] rounded-t-md" />
                            <div className="relative">
                                <div className="absolute -top-8 left-3 w-[40px] h-[40px]">
                                    <CircularProgressbar
                                        value={Math.round(item.vote_average * 10)}
                                        styles={buildStyles({
                                            pathColor: Math.round(item?.vote_average * 10) >= 70 ? "#00ff88" : Math.round(item.vote_average * 10) >= 50 ? "yellow" : 'red',
                                            trailColor: 'gray'
                                        })}
                                        className="w-[40px] h-[40px]"
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
                                        {Math.round(item.vote_average * 10) !== 0 ? Math.round(item.vote_average * 10) : 'NR'}
                                        <sup className="text-[6px]">{Math.round(item.vote_average * 10) !== 0 && '%'}</sup>
                                    </div>
                                </div>
                            </div>
                            <div className="pl-4 pt-4">
                                <div className="font-bold break-all w-[150px]">
                                    {item.original_title || item.title}
                                </div>
                                <div>
                                    {item.release_date && dateMapping[item?.release_date?.slice(5, 7)]} {item?.release_date?.slice(5, 7)}, {item?.release_date?.slice(0, 4)}
                                </div>
                            </div>
                        </div>
                    </motion.div>)
                }
            </div>
            <div>{popularMovies.error}</div>
            {!popularMovies.loading && popularMovies.popular_movies.length > 0 && <Button className="w-full h-12 my-12 font-bold" ref={loadMore}>Load More</Button>}
        </div>
    )
}

export default PopularMovies2