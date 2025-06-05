import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MovieAccountStates } from "../utils/utils";

interface InitialStateType {
    result : MovieAccountStates | null , 
    loading : boolean ,
    error : string | null 
}


const initialState : InitialStateType = {
    result : null , 
    loading : false ,
    error : null 
}


const sliceAccountStatesforWatchlist = createSlice({
    name : 'sliceAccountStatesforWatchlist' ,
    initialState , 
    reducers : {
        fetchAccountStatesforWatchlist : ( state , _action : PayloadAction<{media_id : number , session_id : string}>) => {
            state.error = null ;
            state.loading = true ;
            state.result = null ;
        },
        fetchAccountStatesforWatchlistSuccess : ( state , action : PayloadAction<MovieAccountStates>) => {
            state.error = null ;
            state.loading = false ;
            state.result = action.payload ;
        },
        fetchAccountStatesforWatchlistFailed : ( state , action : PayloadAction<string>) => {
            state.error = action.payload ;
            state.loading = false ;
            state.result = null ;
        },
        clearStateAccountStatesforWatchlist : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.result = null ;
        }
    }
})


export const { fetchAccountStatesforWatchlist , fetchAccountStatesforWatchlistFailed , fetchAccountStatesforWatchlistSuccess , clearStateAccountStatesforWatchlist } = sliceAccountStatesforWatchlist.actions ;
export default sliceAccountStatesforWatchlist.reducer ;