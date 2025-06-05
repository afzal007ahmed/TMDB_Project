import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MovieCredit } from "../utils/utils";

interface InitialStateType {
    movies : MovieCredit[] ,
    loading : boolean ,
    error : string | null 
}


const initialState : InitialStateType = {
    loading : false ,
    movies : [] ,
    error : null 
}

const sliceMoviesDone = createSlice({
    name : 'sliceMoviesDone' ,
    initialState ,
    reducers : {
        fetchMoviesDone : ( state , _action ) => {
            state.error = null ;
            state.loading = true ;
            state.movies = [] ;
        },
        fetchMoviesDoneSuccess : ( state , action : PayloadAction<MovieCredit[]> ) => {
            state.error = null ;
            state.loading = false ;
            state.movies = action.payload ;
        },
        fetchMoviesDoneFailed : ( state , action : PayloadAction<string>)=> {
            state.error = action.payload ;
            state.loading = false ;
            state.movies = [];
        },
        clearStateMoviesDone : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.movies = []; 
        }
    }
})


export const { fetchMoviesDone , fetchMoviesDoneFailed , fetchMoviesDoneSuccess , clearStateMoviesDone } = sliceMoviesDone.actions ;
export default sliceMoviesDone.reducer ;