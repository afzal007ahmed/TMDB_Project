import type { RootState } from "@/rootReducers"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { clearStatePersonDetails, fetchPersonDetails } from "./redux/sliceSingleProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { dateMapping } from "../HomeScreen/components/Trending/utils/utils";
import { fetchMoviesDone } from "./redux/sliceMoviesDone";
import { motion } from "framer-motion";
import routes from "@/RouteManagement/routes";
import Timeline from "./components/Timeline";

const ScreenProfile = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const personDetails = useSelector((state: RootState) => state.reducerPersonalDetails);
    const moviesDone = useSelector((state: RootState) => state.reducerMoviesDone);
    const dispatch = useDispatch();
    const date = new Date();
    const [read, setRead] = useState(false);
    useEffect(() => {
        document.title = 'Loading...'
        dispatch(fetchPersonDetails(Number(id)))
        dispatch(fetchMoviesDone(id))
        return (() => {
            dispatch(clearStatePersonDetails({}))
        })
    }, [id])
    useEffect(() => {
        if (personDetails.details) {
            document.title = personDetails.details.name;
        }
    }, [personDetails.details])
    return (
        <div>
            <div className="mt-4 p-6 md:px-24 max-w-[1400px] w-full mx-auto lg:flex gap-8">
                <div className="shrink-0">
                    {/*image*/}
                    <div className="flex justify-center">
                        {personDetails.loading && <Skeleton className="w-[250px] h-[400px]" />}
                        {!personDetails.loading && personDetails.details && <img className="w-[250px] h-[400px] rounded-lg object-cover" src={`https://image.tmdb.org/t/p/w500${personDetails.details.profile_path}.jpg`} />}
                        {
                            personDetails.error && <div className="text-red-600 font-bold">{personDetails.error}</div>
                        }
                    </div>
                    <div className="mt-8">
                        <div className="font-bold mb-3">Personal Info</div>
                        <div className="mb-8">
                            <div className="text-sm font-bold mt-2">Known for</div>
                            {personDetails.loading && <Skeleton className="h-[20px] w-[50px]" />}
                            {personDetails.details && <span className="text-sm font-medium">{personDetails.details.known_for_department}</span>}
                            {
                                personDetails.error && <div className="text-red-600 font-bold">{personDetails.error}</div>
                            }
                        </div>
                        <div className="mb-8">
                            <div className="text-sm font-bold">Gender</div>
                            {personDetails.loading && <Skeleton className="h-[20px] w-[50px]" />}
                            {personDetails.details && <span className="text-sm font-medium">{personDetails.details.gender === 1 ? 'Female' : personDetails.details.gender === 2 ? 'Male' : personDetails.details.gender === 3 ? 'Non Binary' : 'Not Set'}</span>}
                            {
                                personDetails.error && <div className="text-red-600 font-bold">{personDetails.error}</div>
                            }
                        </div>
                        <div className="mb-8">
                            <div className="text-sm font-bold">Birthday</div>
                            {personDetails.loading && <Skeleton className="h-[20px] w-[50px]" />}
                            {personDetails.details && <span className="text-sm font-medium">{dateMapping[personDetails.details.birthday?.slice(5, 7) as string]} {personDetails.details.birthday?.slice(8)}, {personDetails.details.birthday?.slice(0, 4)} {date.getMonth() <= Number(personDetails.details.birthday?.slice(5, 7)) && date.getDay() >= Number(personDetails.details.birthday?.slice(8)) ? `(${date.getFullYear() - Number(personDetails.details.birthday?.slice(0, 4))} Years)` : `(${date.getFullYear() - Number(personDetails.details.birthday?.slice(0, 4)) - 1} Years)`}</span>}
                            {
                                personDetails.error && <div className="text-red-600 font-bold">{personDetails.error}</div>
                            }
                        </div>
                        <div className="mb-8">
                            <div className="text-sm font-bold">Place of Birth</div>
                            {personDetails.loading && <Skeleton className="h-[20px] w-[50px]" />}
                            {personDetails.details && <span className="text-sm font-medium">{personDetails.details.place_of_birth}</span>}
                            {
                                personDetails.error && <div className="text-red-600 font-bold">{personDetails.error}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="mb-4">
                        {personDetails.loading && <Skeleton className="h-[20px] w-[150px]" />}
                        {personDetails.details?.name && <span className="text-4xl font-bold">{personDetails.details.name}</span>}
                        {
                            personDetails.error && <div className="text-red-600 font-bold">{personDetails.error}</div>
                        }
                    </div>
                    <div>
                        <div className="text-xl font-bold mb-4">Biography</div>
                        {personDetails.loading && <Skeleton className="h-[20px] w-[150px]" />}
                        {personDetails.details?.biography && <div className="text-sm">{!read ? `${personDetails.details.biography.slice(0, 400)}...` : personDetails.details.biography}</div>}
                        {personDetails.details?.biography && !read && <div className="text-blue-600 font-bold text-right cursor-pointer" onClick={() => setRead(true)}>Read more</div>}
                        {
                            personDetails.error && <div className="text-red-600 font-bold">{personDetails.error}</div>
                        }
                    </div>
                    {/*Movies Done*/}
                    <div className="relative">
                        <div className="flex gap-2 my-12 overflow-auto scrollbar-hide max-w-full">
                            {
                                moviesDone.loading && Array.from({ length: 17 }).map((_, index) => <div className="w-[150px] h-[350px]" key={index}>
                                    <Skeleton className="w-[150px] h-[220px] shrink-0" />
                                </div>)
                            }
                            {
                                !moviesDone.loading && moviesDone.movies.map((item, index) => <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="z-2 cursor-pointer shrink-0 transition-all ease-in-out duration-150"
                                    onClick={() => nav(routes.SCREEN_MOVIE.slice(0, routes.SCREEN_MOVIE.length - 3) + item.id)}
                                >
                                    <div className="z-2 cursor-pointer shrink-0">
                                        <div>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}.jpg`}
                                                className="w-[150px] h-[220px] object-cover object-center rounded-lg"
                                                alt={item.title || item.original_title}
                                            />
                                        </div>
                                        <div className="my-2">
                                            <div className="text-sm font-bold break-all w-[150px]">{item.original_title || item.title}</div>
                                        </div>

                                    </div>
                                </motion.div>)
                            }
                            {
                                moviesDone.error && <div className="text-red-600 font-bold">{moviesDone.error}</div>
                            }
                        </div>
                        <div className="h-full z-2 w-[50px] bg-gradient-to-l from-white to-transparent absolute right-0 top-0"></div>
                    </div>
                    <div>
                       { personDetails.details && personDetails.details?.id && <Timeline id={personDetails.details?.id as number}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScreenProfile