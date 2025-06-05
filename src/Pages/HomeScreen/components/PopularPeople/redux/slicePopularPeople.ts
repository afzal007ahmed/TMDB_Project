import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PopularPerson } from "../utils/utils";

interface InitialStateType{
    people : PopularPerson[] ,
    loading : boolean ,
    error : string | null 
}


const initialState : InitialStateType = {
    people : [],
    loading : false ,
    error : null 
}

const slicePopularPeople = createSlice({
    name : 'slicePopularPeople' ,
    initialState ,
    reducers : {
        fetchPopularPeople : ( state , _action ) => {
           state.loading = true ;
           state.error = null ;
           state.people = [] ;
        },
        fetchPopularPeopleSuccess : ( state , action : PayloadAction<PopularPerson[]> ) => {
            state.loading = false ;
            state.error = null ;
            state.people = action.payload ;
         },
         fetchPopularPeopleFailed : ( state , action: PayloadAction<string> ) => {
            state.loading = false ;
            state.error = action.payload ;
            state.people = [] ;
         },
         clearStatePopularPeople : ( state , _action ) => {
            state.loading = false ;
            state.error = null;
            state.people = [] ;
         }
    }
})


export const { fetchPopularPeople , fetchPopularPeopleSuccess , fetchPopularPeopleFailed , clearStatePopularPeople } = slicePopularPeople.actions ;
export default slicePopularPeople.reducer ;