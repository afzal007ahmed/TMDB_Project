


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MovieCredit } from "../utils/utils";

interface InitialStateType {
    movies : MovieCredit[] ,
    crew : MovieCredit[],
    loading : boolean ,
    error : string | null 
}


const initialState : InitialStateType = {
    loading : false ,
    movies : [] ,
    crew:[] ,
    error : null 
}

const sliceTimeLine = createSlice({
    name : 'sliceTimeLine' ,
    initialState ,
    reducers : {
        fetchTimeLine : ( state , _action ) => {
            state.error = null ;
            state.loading = true ;
            state.movies = [] ;
            state.crew = [] ;
        },
        fetchTimeLineSuccess : ( state , action : PayloadAction<{ movies : MovieCredit[] , crew : MovieCredit[]}> ) => {
            state.error = null ;
            state.loading = false ;
            state.movies = action.payload.movies ;
            state.crew = action.payload.crew ;
        },
        fetchTimeLineFailed : ( state , action : PayloadAction<string>)=> {
            state.error = action.payload ;
            state.loading = false ;
            state.movies = [];
            state.crew = [] ;
        },
        clearStateTimeLine : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.movies = [];
            state.crew = [] ; 
        }
    }
})


export const { fetchTimeLine , fetchTimeLineFailed , fetchTimeLineSuccess , clearStateTimeLine } = sliceTimeLine.actions ;
export default sliceTimeLine.reducer ;