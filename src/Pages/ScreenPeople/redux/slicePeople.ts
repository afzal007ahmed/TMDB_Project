import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TmdbPerson } from "../utils/utils";



interface InitialStateType {
    people: TmdbPerson[],
    loading: boolean,
    error: string | null
}


const initialState: InitialStateType = {
    people: [],
    loading: false,
    error: null
}


const slicePeople = createSlice({
    name: 'slicePeople',
    initialState,
    reducers: {
        fetchPeople: (state, _action : PayloadAction<number>) => {
            state.loading = true;
        },
        fetchPeopleSuccess: (state, action: PayloadAction<TmdbPerson[]>) => {
            state.people = [ ...state.people , ...action.payload];
            state.error = null;
            state.loading = false;
        },
        fetchPeopleFailed: (state, action: PayloadAction<string>) => {
            state.people = [];
            state.error = action.payload;
            state.loading = false;
        },
        clearStatePeople: (state, _action) => {
            state.people = [];
            state.error = null;
            state.loading = false;
        }
    }
})


export const { fetchPeople , fetchPeopleFailed , fetchPeopleSuccess , clearStatePeople } = slicePeople.actions ;
export default slicePeople.reducer ;