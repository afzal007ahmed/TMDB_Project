import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TvAccountStates } from "../utils/utils";

interface InitialStateType {
    result : TvAccountStates | null , 
    loading : boolean ,
    error : string | null 
}


const initialState : InitialStateType = {
    result : null , 
    loading : false ,
    error : null 
}


const sliceAccountStatesWatchlistTv = createSlice({
    name : 'sliceAccountStatesWatchlistTv' ,
    initialState , 
    reducers : {
        fetchAccountStatesWatchlistTv : ( state , _action : PayloadAction<{media_id : number , session_id : string}>) => {
            state.error = null ;
            state.loading = true ;
            state.result = null ;
        },
        fetchAccountStatesWatchlistTvSuccess : ( state , action : PayloadAction<TvAccountStates>) => {
            state.error = null ;
            state.loading = false ;
            state.result = action.payload ;
        },
        fetchAccountStatesWatchlistTvFailed : ( state , action : PayloadAction<string>) => {
            state.error = action.payload ;
            state.loading = false ;
            state.result = null ;
        },
        clearStateAccountStatesWatchlistTv : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.result = null ;
        }
    }
})


export const { fetchAccountStatesWatchlistTv , fetchAccountStatesWatchlistTvFailed , fetchAccountStatesWatchlistTvSuccess , clearStateAccountStatesWatchlistTv } = sliceAccountStatesWatchlistTv.actions ;
export default sliceAccountStatesWatchlistTv.reducer ;