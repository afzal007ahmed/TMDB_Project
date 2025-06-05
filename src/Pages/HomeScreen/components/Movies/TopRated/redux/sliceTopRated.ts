import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TopRatedMoviesResponse } from "../utils/utils";


interface InitialStateType {
    top_rated : TopRatedMoviesResponse | null ,
    loading : boolean ,
    error : string | null   
}

const initialState : InitialStateType = { 
    top_rated : null ,
    loading : false ,
    error : null 
}


const sliceTopRatedMovies = createSlice({
    name : 'sliceTopRatedMovies' ,
    initialState ,
    reducers : {
        fetchTopRatedMovies : ( state , _action ) => {
            state.loading = true ;
            state.top_rated = null ;
            state.error = null ;
        },
        fetchTopRatedMoviesSuccess : ( state , action:PayloadAction<TopRatedMoviesResponse> ) => {
            state.loading = false ;
            state.top_rated = action.payload ;
            state.error = null ;
        },
        fetchTopRatedMoviesFailed : ( state , action:PayloadAction<string> ) => {
            state.loading = false ;
            state.top_rated = null ;
            state.error = action.payload ;
        },
        clearStateTopRatedMovies : ( state , _action) => {
            state.loading = false ;
            state.top_rated = null ;
            state.error = null ;
        }
    }
})

export const { fetchTopRatedMovies , fetchTopRatedMoviesSuccess , fetchTopRatedMoviesFailed , clearStateTopRatedMovies } = sliceTopRatedMovies.actions ;
export default sliceTopRatedMovies.reducer ;