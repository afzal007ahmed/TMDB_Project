import type { RootState } from "@/rootReducers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchPopularPeople } from "./redux/slicePopularPeople";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import routes from "@/RouteManagement/routes";

const PopularPeople = () => {
    const dispatch = useDispatch();
    const popularPeople = useSelector((state: RootState) => state.reducerPopularPeople);
    useEffect(() => {
        dispatch(fetchPopularPeople({}));
    }, [])
    const nav = useNavigate() ;
    return (
        <div className="mt-12 p-6 md:px-24 md:mt-0 max-w-[1400px] w-full mx-auto">
            <div className="text-2xl font-bold">Popular People</div>
            <div className="flex flex-wrap justify-between mt-12 mb-12">
                {
                    popularPeople.loading && <div className="flex flex-wrap justify-between">
                        {Array.from({ length: 6 }).map((_,index) => <div className="flex items-center gap-4 m-6" key={index}>
                            <Skeleton className="h-[100px] w-[100px] rounded-[100px]" />
                            <div className="flex flex-col gap-2 items-center">
                                <Skeleton className="w-[150px] h-[20px]" />
                                <Skeleton className="w-[150px] h-[20px]" />
                            </div>
                        </div>)}
                    </div>
                }
                {
                    !popularPeople.loading && popularPeople.people.length > 0 && popularPeople.people.map((item, index) =>
                        <motion.div
                            key={index}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeInOut' }}
                            className="cursor-pointer hover:bg-gray-200 p-4 rounded-md hover:scale-105"
                            onClick={() => nav(routes.SCREEN_PROFILE.slice(0,routes.SCREEN_PROFILE.length - 3 ) + item.id ) } 
                        >
                            <div className="flex items-center gap-4 w-[250px]">
                                <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}.jpg`} className="w-[100px] h-[100px] rounded-[100px] object-cover shrink-0" />
                                <div>
                                    <div className="font-bold">{item.name}</div>
                                    <span className="text-sm font-medium text-gray-500">{item.known_for_department}</span>

                                </div>
                            </div>
                        </motion.div>
                    )
                }
                {
                    popularPeople.error && <div>{ popularPeople.error }</div>
                }
            </div>
        </div>
    )
}

export default PopularPeople