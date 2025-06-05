import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TopRatedMovie } from "../utils/utils";


interface InitialStateType {
    top_rated : TopRatedMovie[] ,
    loading : boolean ,
    error : string | null   
}

const initialState : InitialStateType = { 
    top_rated : [] ,
    loading : false ,
    error : null 
}


const sliceTopRatedMovies2 = createSlice({
    name : 'sliceTopRatedMovies2' ,
    initialState ,
    reducers : {
        fetchTopRatedMovies2 : ( state , _action:PayloadAction<number> ) => {
            state.loading = true ;
        },
        fetchTopRatedMovies2Success : ( state , action:PayloadAction<TopRatedMovie[]> ) => {
            state.loading = false ;
            state.top_rated = [ ...state.top_rated ,...action.payload] ;
            state.error = null ;
        },
        fetchTopRatedMovies2Failed : ( state , action:PayloadAction<string> ) => {
            state.loading = false ;
            state.top_rated = [] ;
            state.error = action.payload ;
        },
        clearStateTopRatedMovies2 : ( state , _action) => {
            state.loading = false ;
            state.top_rated = [] ;
            state.error = null ;
        }
    }
})

export const { fetchTopRatedMovies2 , fetchTopRatedMovies2Success , fetchTopRatedMovies2Failed , clearStateTopRatedMovies2 } = sliceTopRatedMovies2.actions ;
export default sliceTopRatedMovies2.reducer ;