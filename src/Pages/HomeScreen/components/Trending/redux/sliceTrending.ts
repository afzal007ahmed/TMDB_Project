import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MediaResponse } from "../utils/utils";

interface InitialStateType {
  trending : MediaResponse | null ,
  loading : boolean   ,
  error : string | null  
}

const initialState : InitialStateType = {
    trending : null ,
    loading : false ,
    error : null 
}


const sliceTrending = createSlice({
    name : 'sliceTrending' ,
    initialState ,
    reducers : {
        fetchTrending : ( state , _action : PayloadAction<string> ) => {
            state.trending = null ;
            state.error = null ;
            state.loading = true ;
        },
        fetchTrendingSuccess : ( state , action: PayloadAction<MediaResponse>) => {
            state.error = null ;
            state.loading = false ;
            state.trending = action.payload ;
        },
        fetchTrendingFailed : ( state , action : PayloadAction<string>) =>{
            state.error = action.payload ;
            state.loading = false ;
            state.trending = null;
        },
        clearStateTrending : ( state , _action) => {
            state.error = null ;
            state.loading = false ;
            state.trending = null ;
        } 
    }
})

export const { fetchTrending , fetchTrendingSuccess , fetchTrendingFailed , clearStateTrending  } = sliceTrending.actions ;
export default sliceTrending.reducer ;