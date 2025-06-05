import type { RootState } from '@/rootReducers';
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearStatePeople, fetchPeople } from './redux/slicePeople';
import { motion } from 'framer-motion';
import routes from '@/RouteManagement/routes';
import { Button } from '@/components/ui/button';

const ScreenPeople = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const page = useRef(1);
    const people = useSelector((state: RootState) => state.reducerPeople);
    const loadMore = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        document.title = `Popular People`
        dispatch(fetchPeople(page.current));
        page.current = page.current + 1;
        return (() => {
            dispatch(clearStatePeople({}));
        })
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    dispatch(fetchPeople(page.current));
                    page.current = page.current + 1;
                }
            }, {
            threshold: 0.01
        }
        )
        if (loadMore.current) {
            observer.observe(loadMore.current);
        }
    }, [people.people])

    return (
        <div className="w-full max-w-[1400px] mx-auto lg:p-24 md:p-12 p-2  ">
            <div>
                <div className="font-bold text-2xl mb-12">Popular People</div>
                <div className="flex flex-wrap gap-2 justify-around">
                    {
                        people.people.length > 0 && people.people.map((item, index) => <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={index}
                            transition={{ delay: index * 0.01, duration: 0.3 }}
                            className="shadow-xl border rounded-md cursor-pointer"
                            onClick={() => nav(routes.SCREEN_PROFILE.slice(0, routes.SCREEN_PROFILE.length - 3) + item.id)}
                        > <div className="shrink-0 rounded-md mb-8">
                                <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}.jpg`} className="h-[250px] w-[180px] rounded-t-md" />
                                <div className="pl-4 pt-4">
                                    <div className="font-bold break-all w-[150px]">
                                        {item.name }
                                    </div>
                                    <div>
                                        {item.known_for_department}
                                    </div>
                                </div>
                            </div>
                        </motion.div>)
                    }
                </div>
                <div>{people.error}</div>
                {!people.loading && people.people.length > 0 && <Button className="w-full h-12 my-12 font-bold" ref={loadMore}>Load More</Button>}
            </div>

        </div>
    )
}

export default ScreenPeople