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


const sliceAccountStates = createSlice({
    name : 'sliceAccountStates' ,
    initialState , 
    reducers : {
        fetchAccountStates : ( state , _action : PayloadAction<{media_id : number , session_id : string}>) => {
            state.error = null ;
            state.loading = true ;
            state.result = null ;
        },
        fetchAccountStatesSuccess : ( state , action : PayloadAction<MovieAccountStates>) => {
            state.error = null ;
            state.loading = false ;
            state.result = action.payload ;
        },
        fetchAccountStatesFailed : ( state , action : PayloadAction<string>) => {
            state.error = action.payload ;
            state.loading = false ;
            state.result = null ;
        },
        clearStateAccountStates : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.result = null ;
        }
    }
})


export const { fetchAccountStates , fetchAccountStatesFailed , fetchAccountStatesSuccess , clearStateAccountStates } = sliceAccountStates.actions ;
export default sliceAccountStates.reducer ;