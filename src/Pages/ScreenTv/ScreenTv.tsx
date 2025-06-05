import { useNavigate, useParams } from "react-router-dom"
import { dateMapping } from "../HomeScreen/components/Trending/utils/utils"
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStateTv, fetchTv } from "./redux/sliceTv";
import type { RootState } from "@/rootReducers";
import { motion } from "framer-motion";
import routes from "@/RouteManagement/routes";
import { Button } from "@/components/ui/button";

const ScreenTv = () => {
    const mapping : Record<string,string> = {
        ["top_rated"] : 'Top Rated' ,
        ["popular"] : 'Popular' ,
        ["airing_today"] : 'Arring Today' ,
        ["on_the_air"] : 'On the air'
    }
    const nav = useNavigate();
    const { category } = useParams();
    const dispatch = useDispatch();
    const page = useRef(1);
    const tv = useSelector((state: RootState) => state.reducerTv);
    const loadMore = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        document.title = `${mapping[category as string]} Tv`
        dispatch(fetchTv({ page: page.current, category: category as string }));
        page.current = page.current + 1;
        return (() => {
            dispatch(clearStateTv({}));
        })
    }, [category])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    dispatch(fetchTv({ page: page.current + 1, category: category as string }));
                    page.current = page.current + 1;
                }
            }, {
            threshold: 0.01
        }
        )
        if (loadMore.current) {
            observer.observe(loadMore.current);
        }
    }, [tv.tv])
    return (
        <div className="w-full max-w-[1400px] mx-auto lg:p-24 md:p-12 p-2  ">
            <div>
                <div className="font-bold text-2xl mb-12">{ category && mapping[category]} Tv Shows</div>
                <div className="flex flex-wrap gap-2 justify-around">
                    {
                        tv.tv.length > 0 && tv.tv.map((item, index) => <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={index}
                            transition={{ delay: index * 0.01, duration: 0.3 }}
                            className="shadow-xl border rounded-md cursor-pointer"
                            onClick={() => nav(routes.SCREEN_TV.slice(0, routes.SCREEN_TV.length - 3) + item.id)}
                        > <div className="shrink-0 rounded-md mb-8">
                                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}.jpg`} className="h-[250px] w-[180px] rounded-t-md" />
                                <div className="pl-4 pt-4">
                                    <div className="font-bold break-all w-[150px]">
                                        {item.name || item.original_name}
                                    </div>
                                    <div>
                                        {item.first_air_date && dateMapping[item?.first_air_date?.slice(5, 7)]} {item?.first_air_date?.slice(5, 7)}, {item?.first_air_date?.slice(0, 4)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>)
                    }
                </div>
                <div>{tv.error}</div>
                {!tv.loading && tv.tv.length > 0 && <Button className="w-full h-12 my-12 font-bold" ref={loadMore}>Load More</Button>}
            </div>

        </div>
    )
}

export default ScreenTv