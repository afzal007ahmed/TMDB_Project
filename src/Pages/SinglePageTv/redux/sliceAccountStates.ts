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


const sliceAccountStatesTv = createSlice({
    name : 'sliceAccountStatesTv' ,
    initialState , 
    reducers : {
        fetchAccountStatesTv : ( state , _action : PayloadAction<{media_id : number , session_id : string}>) => {
            state.error = null ;
            state.loading = true ;
            state.result = null ;
        },
        fetchAccountStatesTvSuccess : ( state , action : PayloadAction<TvAccountStates>) => {
            state.error = null ;
            state.loading = false ;
            state.result = action.payload ;
        },
        fetchAccountStatesTvFailed : ( state , action : PayloadAction<string>) => {
            state.error = action.payload ;
            state.loading = false ;
            state.result = null ;
        },
        clearStateAccountStatesTv : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.result = null ;
        }
    }
})


export const { fetchAccountStatesTv , fetchAccountStatesTvFailed , fetchAccountStatesTvSuccess , clearStateAccountStatesTv } = sliceAccountStatesTv.actions ;
export default sliceAccountStatesTv.reducer ;