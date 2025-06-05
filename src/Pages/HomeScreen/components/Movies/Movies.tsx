import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import Popular from "./Popular/Popular";
import TopRated from "./TopRated/TopRated";
import Streaming from "./Streaming/Streaming";
import Upcoming from "./Upcoming/Upcoming";
const Movies = () => {
    const [toggle, setToggle] = useState('popular');
    function handleToggle( value : string ) {
        if( toggle === value ) {
            return ;
        }
        setToggle(value) ;
    }
    return (
        <div className="bg-[#365362]">
            <div className="mt-12 p-6 md:px-24 md:mt-0 max-w-[1400px] w-full mx-auto">
                <div className="flex gap-6">
                    <div className="text-white font-bold text-2xl flex items-center">Movies</div>
                    <div className="border gap-4 font-bold text-white rounded-4xl text-sm border-[#1ED5A9] hidden lg:flex cursor-pointer">
                        <div className={`px-4 flex items-center rounded-4xl ${toggle === 'popular' && 'bg-gradient-to-tr from-[#AFF9CB] to-[#3DDDB0] text-[#0D253F]'} transistion duration-200 ease-in-out`} onClick={() => handleToggle('popular')}>Popular</div>
                        <div className={`px-4 flex items-center rounded-4xl ${toggle === 'streaming' && 'bg-gradient-to-tr from-[#AFF9CB] to-[#3DDDB0] text-[#0D253F]'} transistion duration-200 ease-in-out`} onClick={() => handleToggle('streaming')}>Streaming</div>
                        <div className={`px-4 flex items-center rounded-4xl ${toggle === 'top-rated' && 'bg-gradient-to-tr from-[#AFF9CB] to-[#3DDDB0] text-[#0D253F]'} transistion duration-200 ease-in-out`} onClick={() => handleToggle('top-rated')}>Top Rated</div>
                        <div className={`px-4 flex items-center rounded-4xl ${toggle === 'upcoming' && 'bg-gradient-to-tr from-[#AFF9CB] to-[#3DDDB0] text-[#0D253F]'} transistion duration-200 ease-in-out`} onClick={() => handleToggle('upcoming')}>Upcoming</div>
                    </div>
                    <Select value={toggle} onValueChange={(value) => handleToggle( value ) }>
                        <SelectTrigger className="text-white font-bold bg-[#365362] text-sm lg:hidden">
                            <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                        <SelectContent className="text-white font-bold bg-[#365362] text-sm">
                            <SelectItem value="popular">Popular</SelectItem>
                            <SelectItem value="streaming">Streaming</SelectItem>
                            <SelectItem value="top-rated">Top Rated</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                { toggle === 'popular' && <Popular/>}
                { toggle === 'top-rated' && <TopRated/>}
                { toggle === 'streaming' && <Streaming/>}
                { toggle === 'upcoming' && <Upcoming/>}
             </div>
        </div>
    )
}

export default Movies