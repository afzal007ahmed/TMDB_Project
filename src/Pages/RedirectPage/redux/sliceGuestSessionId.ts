import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType{
    loading : boolean ,
    session_id : string | null  ,
    expiry_date : string | null ,
    error : string | null
}

const initialState : InitialStateType = {
    loading : false ,
    session_id : null ,
    error : null ,
    expiry_date : null
}

const sliceGuestSessionId = createSlice({
    name : 'sliceGuestSessionId' ,
    initialState , 
    reducers : {
        fetchGuestSessionId : ( state , _action ) => {
            state.loading = true ;
            state.error = null ;
            state.session_id = null ;
        },
        fetchGuestSessionIdSuccess : ( state , action : PayloadAction<{ session_id : string , expiry_id : string}> ) =>{
            state.loading = false ;
            state.error = null ;
            state.session_id = action.payload.session_id ;
            state.expiry_date = action.payload.expiry_id ;   
        },
        fetchGuestSessionIdFailed : ( state , action : PayloadAction<string> ) => {
            state.loading = false ;
            state.error = action.payload ;
            state.session_id = null ; 
            state.expiry_date = null;
        },
        clearStateGuestSessionId : ( state , _action ) => {
            state.loading = false ;
            state.error = null ;
            state.session_id = null ;
            state.expiry_date = null; 
        }
    }
})

export const { fetchGuestSessionId , fetchGuestSessionIdSuccess, fetchGuestSessionIdFailed , clearStateGuestSessionId } = sliceGuestSessionId.actions ; 
export default sliceGuestSessionId.reducer ;