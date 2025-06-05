import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TVSeriesDetails } from "../utils/utils";

interface InitialStateType {
    details : TVSeriesDetails | null ,
    loading : boolean ,
    error : string | null 
}


const initialState : InitialStateType = {
    loading : false ,
    details : null ,
    error : null 
}



const sliceTvDetails = createSlice({
    name : 'sliceTvDetails' ,
    initialState ,
    reducers : {
        fetchTvDetails : ( state , _action : PayloadAction<string>) => {
            state.details = null ;
            state.error = null ;
            state.loading = true ;
        },
        fetchTvDetailsSuccess : ( state , action : PayloadAction<TVSeriesDetails>) => {
            state.details = action.payload ;
            state.error = null ;
            state.loading = false ;
        },
        fetchTvDetailsFailed : ( state , action : PayloadAction<string>) => {
            state.details = null ;
            state.error = action.payload ;
            state.loading = false ;
        },
        clearStateTvDetails : ( state , _action ) => {
            state.details = null ;
            state.error = null;
            state.loading = false ;
        }
    }
})

export const { fetchTvDetails , fetchTvDetailsFailed , fetchTvDetailsSuccess , clearStateTvDetails } = sliceTvDetails.actions ;
export default sliceTvDetails.reducer ;