

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UpcomingMovieResponse } from "../utils/utils";



interface InitialStateType {
    upcoming: UpcomingMovieResponse | null,
    loading: boolean,
    error: string | null
}


const initialState: InitialStateType = {
    upcoming: null,
    loading: false,
    error: null
}


const sliceupcomingMovies = createSlice({
    name: 'sliceupcomingMovies',
    initialState,
    reducers: {
        fetchUpcomingMovies: (state, _action) => {
            state.upcoming = null;
            state.error = null;
            state.loading = true;
        },
        fetchUpcomingMoviesSuccess: (state, action: PayloadAction<UpcomingMovieResponse>) => {
            state.upcoming = action.payload;
            state.error = null;
            state.loading = false;
        },
        fetchUpcomingMoviesFailed: (state, action: PayloadAction<string>) => {
            state.upcoming = null;
            state.error = action.payload;
            state.loading = false;
        },
        clearStateUpcomingMovies: (state, _action) => {
            state.upcoming = null;
            state.error = null;
            state.loading = false;
        }
    }
})


export const { fetchUpcomingMovies , fetchUpcomingMoviesFailed , fetchUpcomingMoviesSuccess , clearStateUpcomingMovies } = sliceupcomingMovies.actions ;
export default sliceupcomingMovies.reducer ;