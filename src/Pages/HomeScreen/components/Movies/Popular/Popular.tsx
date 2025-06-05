import { Skeleton } from '@/components/ui/skeleton';
import type { RootState } from '@/rootReducers';
import { useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from './redux/slicePopularMovies';
import { dateMapping } from '../../Trending/utils/utils';
import { motion } from 'framer-motion';
import routes from '@/RouteManagement/routes';
import { useNavigate } from 'react-router-dom';

const Popular = () => {
    const popularMovies = useSelector((state: RootState) => state.reducerPopularMovies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPopularMovies({}));
    }, []);
    const nav = useNavigate() ;
    return (
        <div className='relative'>
            <div className="flex items-stretch gap-4 overflow-x-auto scrollbar-hide mt-12 min-h-[340px]">
                {
                    popularMovies.loading && Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className='w-[150px] h-[350px]'>
                            <Skeleton className="w-[150px] h-[220px]" />
                        </div>
                    ))
                }
                {!popularMovies.loading && popularMovies.popular_movies?.results.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="z-2 cursor-pointer shrink-0 transition-all ease-in-out duration-150"
                        onClick={()=>nav(routes.SCREEN_MOVIE.slice( 0 , routes.SCREEN_MOVIE.length - 3 ) + item.id)}
                    >
                        <div>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}.jpg`}
                                className="w-[150px] h-[220px] object-cover object-center rounded-lg"
                                alt={item.title || item.original_title}
                            />
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
                                        {Math.round(item.vote_average * 10) !== 0 ? Math.round(item.vote_average * 10) : 'NR'}
                                        <sup className="text-[6px]">{Math.round(item.vote_average * 10) !== 0 && '%'}</sup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-white'>
                            <div className="text-sm font-bold break-all w-[150px]">
                                {item.original_title || item.title}
                            </div>
                            <div className="text-sm">
                                {item.release_date && dateMapping[item?.release_date?.slice(5, 7)]} {item?.release_date?.slice(5, 7)}, {item?.release_date?.slice(0, 4)}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className='w-[50px] bg-gradient-to-l from-[#365362] to-transparent absolute top-0 h-full -right-1 z-2'></div>
        </div>
    );
};

export default Popular;
