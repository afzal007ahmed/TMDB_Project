import { createSlice, type PayloadAction } from "@reduxjs/toolkit"



interface InitialStateType {
    loading : boolean , 
    error : string | null ,
    success : string | null 
}

const initialState : InitialStateType = {
    loading : false ,
    error : null ,
    success : null 
}


const sliceAddtoFav = createSlice({
    name :'sliceAddtoFav' ,
    initialState ,
    reducers : {
        fetchAddtoFav : ( state , _action : PayloadAction<{ id : string , session_id : string , media_type : string , media_id : number , favorite : boolean}>) => {
           state.error = null ;
           state.loading = true ;
           state.success = null ;
        },
        fetchAddtoFavSuccess : ( state , action : PayloadAction<string>) => {
            state.error = null ;
            state.loading = false ;
            state.success = action.payload ;
        },
        fetchAddtoFavFailed  : ( state , action : PayloadAction<string>) => {
            state.error = action.payload ;
            state.loading = false ;
            state.success = null ;
        },
        clearStateAddtoFav : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.success = null ;
        }
    }
})

export const { fetchAddtoFav , fetchAddtoFavFailed , fetchAddtoFavSuccess , clearStateAddtoFav } = sliceAddtoFav.actions ;
export default sliceAddtoFav.reducer ;