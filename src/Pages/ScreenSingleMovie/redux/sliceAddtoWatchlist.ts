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


const sliceAddtoWatchlist = createSlice({
    name :'sliceAddtoWatchlist' ,
    initialState ,
    reducers : {
        fetchAddtoWatchlist : ( state , _action : PayloadAction<{ id : string , session_id : string , media_type : string , media_id : number , watchlist : boolean}>) => {
           state.error = null ;
           state.loading = true ;
           state.success = null ;
        },
        fetchAddtoWatchlistSuccess : ( state , action : PayloadAction<string>) => {
            state.error = null ;
            state.loading = false ;
            state.success = action.payload ;
        },
        fetchAddtoWatchlistFailed  : ( state , action : PayloadAction<string>) => {
            state.error = action.payload ;
            state.loading = false ;
            state.success = null ;
        },
        clearStateAddtoWatchlist : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.success = null ;
        }
    }
})

export const { fetchAddtoWatchlist , fetchAddtoWatchlistFailed , fetchAddtoWatchlistSuccess , clearStateAddtoWatchlist } = sliceAddtoWatchlist.actions ;
export default sliceAddtoWatchlist.reducer ;