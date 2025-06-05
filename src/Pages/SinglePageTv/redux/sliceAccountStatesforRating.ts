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


const sliceAccountsStatesforRating = createSlice({
    name : 'sliceAccountsStatesforRating' ,
    initialState , 
    reducers : {
        fetchAccountStatesforRating : ( state , _action : PayloadAction<{media_id : number , session_id : string | null , guest_sesson_id : string | null }>) => {
            state.error = null ;
            state.loading = true ;
            state.result = null ;
        },
        fetchAccountStatesforRatingSuccess : ( state , action : PayloadAction<TvAccountStates>) => {
            state.error = null ;
            state.loading = false ;
            state.result = action.payload ;
        },
        fetchAccountStatesforRatingFailed : ( state , action : PayloadAction<string>) => {
            state.error = action.payload ;
            state.loading = false ;
            state.result = null ;
        },
        clearStateAccountStatesforRating : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.result = null ;
        }
    }
})


export const { fetchAccountStatesforRating , fetchAccountStatesforRatingFailed , fetchAccountStatesforRatingSuccess , clearStateAccountStatesforRating } = sliceAccountsStatesforRating.actions ;
export default sliceAccountsStatesforRating.reducer ;