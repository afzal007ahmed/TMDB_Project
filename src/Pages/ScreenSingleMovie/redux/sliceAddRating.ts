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


const sliceAddRatingMovie = createSlice({
    name :'sliceAddRatingMovie' ,
    initialState ,
    reducers : {
        fetchAddRatingMovie : ( state , _action : PayloadAction<{ value : number , id_type : string , id : string , series_id : string}>) => {
           state.error = null ;
           state.loading = true ;
           state.success = null ;
        },
        fetchAddRatingMovieSuccess : ( state , action : PayloadAction<string>) => {
            state.error = null ;
            state.loading = false ;
            state.success = action.payload ;
        },
        fetchAddRatingMovieFailed  : ( state , action : PayloadAction<string>) => {
            state.error = action.payload ;
            state.loading = false ;
            state.success = null ;
        },
        clearStateAddRatingMovie : ( state , _action ) => {
            state.error = null ;
            state.loading = false ;
            state.success = null ;
        }
    }
})

export const { fetchAddRatingMovie , fetchAddRatingMovieFailed , fetchAddRatingMovieSuccess , clearStateAddRatingMovie } = sliceAddRatingMovie.actions ;
export default sliceAddRatingMovie.reducer ;