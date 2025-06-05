import type { RootState } from "@/rootReducers"
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchTimeLine } from "../redux/sliceTimeline";
import type { MovieCredit } from "../utils/utils";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";

const Timeline = ({ id }: { id: number }) => {
    const timeline = useSelector((state: RootState) => state.reducerTimeline);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTimeLine(id))
    }, [])

    const moviesTimeLine = useMemo(() => {
        if (timeline.movies.length) {
            let temp: Record<number, MovieCredit[]> = {};
            timeline.movies.forEach((item) => {
                if (!item.first_air_date && !item.release_date && item.release_date?.length === 0) {
                    return;
                }
                if (!temp[Number(item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4))]) {
                    temp[Number(item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4))] = [];
                }
                temp[Number(item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4))].push(item);
            })
            return temp;
        }
        return {};
    }, [timeline.movies])
    return (
        <div className="mb-12">
            {timeline.movies.length > 0 && <div className="font-bold mb-4">Acting</div>}
            <div className="shadow-lg mb-8">
                {
                    Object.keys(moviesTimeLine).sort().reverse().map((item, ind) => <div key={ind}>{moviesTimeLine[Number(item)].map((movie, index) => <motion.div className="p-12 flex items-center gap-8"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={index}
                        transition={{ ease: 'easeInOut', duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className="text-sm font-bold w-[40px]">{item === '0' ? '-' : item} </div>
                        <Circle size={12} />
                        <div>
                            <div className="font-medium">{movie.title || movie.original_title || movie.original_name}</div>
                            <div className="text-sm text-gray-600"> as {movie.character}</div>
                        </div>
                    </motion.div>
                    )}
                        <hr className="w-[95%] mx-auto" />
                    </div>
                    )
                }
            </div>
            <div className="shadow-lg mb-8">
                { timeline.crew.length > 0 && <div className="font-bold mb-6">Others</div>}
                {
                    timeline.crew.length > 0 && timeline.crew.map((item, index) => <motion.div className="p-12 flex items-center gap-8"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={index}
                        transition={{ ease: 'easeInOut', duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className="text-sm font-bold w-[40px]">{item.release_date?.slice(0,4) || item.first_air_date?.slice(0,4) || '-'} </div>
                        <Circle size={12} />
                        <div>
                            <div className="font-medium">{item.original_name || item.title || item.original_name }</div>
                            <div className="text-sm text-gray-600"> as { item.job}</div>
                        </div>
                    </motion.div>)
                }
            </div>
        </div>
    )
}

export default Timeline