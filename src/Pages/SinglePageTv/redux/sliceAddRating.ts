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


const sliceAddRating = createSlice({
    name :'sliceAddRating' ,
    initialState ,
    reducers : {
        fetchAddRatingTv : ( state , _action : PayloadAction<{ value : number , id_type : string , id : string , series_id : string}>) => {
           state.error = null ;
           state.loading = true ;
           state.success = null ;
        },
        fetchAddRatingTvSuccess : ( state , action : PayloadAction<string>) => {
            state.error = null ;
            state.loading = false ;
            state.success = action.payload ;
        },
        fetchAddRatingTvFailed  : ( state , action : PayloadAction<string>) => {
            state.error = action.payload ;
            state.loading = false ;
            state.success = null ;
        },
        clearStateAddRatingTv : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.success = null ;
        }
    }
})

export const { fetchAddRatingTv , fetchAddRatingTvFailed , fetchAddRatingTvSuccess , clearStateAddRatingTv } = sliceAddRating.actions ;
export default sliceAddRating.reducer ;