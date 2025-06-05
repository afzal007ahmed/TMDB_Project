

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UpcomingMovie } from "../utils/utils";



interface InitialStateType {
    upcoming: UpcomingMovie[],
    loading: boolean,
    error: string | null
}


const initialState: InitialStateType = {
    upcoming: [],
    loading: false,
    error: null
}


const sliceupcomingMovies2 = createSlice({
    name: 'sliceupcomingMovies2',
    initialState,
    reducers: {
        fetchUpcomingMovies2: (state, _action:PayloadAction<number>) => {
            state.loading = true;
        },
        fetchUpcomingMovies2Success: (state, action: PayloadAction<UpcomingMovie[]>) => {
            state.upcoming = [  ...state.upcoming,...action.payload];
            state.error = null;
            state.loading = false;
        },
        fetchUpcomingMovies2Failed: (state, action: PayloadAction<string>) => {
            state.upcoming = [];
            state.error = action.payload;
            state.loading = false;
        },
        clearStateUpcomingMovies2: (state, _action) => {
            state.upcoming = [];
            state.error = null;
            state.loading = false;
        }
    }
})


export const { fetchUpcomingMovies2 , fetchUpcomingMovies2Failed , fetchUpcomingMovies2Success , clearStateUpcomingMovies2 } = sliceupcomingMovies2.actions ;
export default sliceupcomingMovies2.reducer ;