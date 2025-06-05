import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType{
    loading : boolean ,
    session_id : string | null  ,
    error : string | null
}

const initialState : InitialStateType = {
    loading : false ,
    session_id : null ,
    error : null 
}

const sliceSessionId = createSlice({
    name : 'sliceSessionId' ,
    initialState , 
    reducers : {
        fetchSessionId : ( state , _action ) => {
            state.loading = true ;
            state.error = null ;
            state.session_id = null ;
        },
        fetchSessionIdSuccess : ( state , action : PayloadAction<string> ) =>{
            state.loading = false ;
            state.error = null ;
            state.session_id = action.payload ;   
        },
        fetchSessionIdFailed : ( state , action : PayloadAction<string> ) => {
            state.loading = false ;
            state.error = action.payload ;
            state.session_id = null ; 
        },
        clearStateSessionId : ( state , _action ) => {
            state.loading = false ;
            state.error = null ;
            state.session_id = null ; 
        }
    }
})

export const { fetchSessionId , fetchSessionIdSuccess, fetchSessionIdFailed , clearStateSessionId } = sliceSessionId.actions ; 
export default sliceSessionId.reducer ;