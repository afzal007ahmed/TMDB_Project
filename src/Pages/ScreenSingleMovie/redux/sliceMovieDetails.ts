import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MovieDetails } from "../utils/utils";

interface InitialStateType {
  details : MovieDetails | null ,
  loading : boolean ,
  error : string | null 
}


const initialState : InitialStateType = {
    details : null ,
    loading : false ,
    error : null
}


const sliceMovieDetails = createSlice({
    name : 'sliceMovieDetails' ,
    initialState , 
    reducers : { 
        fetchMovieDetails : ( state , _action:PayloadAction<string>) => {
            state.error = null ;
            state.details = null ;
            state.loading = true ;
        },
        fetchMovieDetailsSuccess : ( state , action:PayloadAction<MovieDetails>) => {
            state.error = null ;
            state.details = action.payload ;
            state.loading = false;
        },
        fetchMovieDetailsFailed : ( state , action:PayloadAction<string>) => {
            state.error = action.payload ;
            state.details = null ;
            state.loading = false;
        },
        clearStateMovieDetails : ( state , _action) => {
            state.error = null ;
            state.details = null ;
            state.loading = false ;
        }
    }
})

export const { fetchMovieDetails , fetchMovieDetailsFailed , fetchMovieDetailsSuccess , clearStateMovieDetails } = sliceMovieDetails.actions ;
export default sliceMovieDetails.reducer ;