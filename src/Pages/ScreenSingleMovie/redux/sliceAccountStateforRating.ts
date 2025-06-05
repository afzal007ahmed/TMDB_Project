import type { TvAccountStates } from "@/Pages/SinglePageTv/utils/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


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


const sliceAccountsStatesforRatingMovie = createSlice({
    name : 'sliceAccountsStatesforRatingMovie' ,
    initialState , 
    reducers : {
        fetchAccountStatesforRatingMovie : ( state , _action : PayloadAction<{media_id : number , session_id : string | null , guest_sesson_id : string | null }>) => {
            state.error = null ;
            state.loading = true ;
            state.result = null ;
        },
        fetchAccountStatesforRatingMovieSuccess : ( state , action : PayloadAction<TvAccountStates>) => {
            state.error = null ;
            state.loading = false ;
            state.result = action.payload ;
        },
        fetchAccountStatesforRatingMovieFailed : ( state , action : PayloadAction<string>) => {
            state.error = action.payload ;
            state.loading = false ;
            state.result = null ;
        },
        clearStateAccountStatesforRatingMovie : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.result = null ;
        }
    }
})


export const { fetchAccountStatesforRatingMovie , fetchAccountStatesforRatingMovieFailed , fetchAccountStatesforRatingMovieSuccess , clearStateAccountStatesforRatingMovie } = sliceAccountsStatesforRatingMovie.actions ;
export default sliceAccountsStatesforRatingMovie.reducer ;