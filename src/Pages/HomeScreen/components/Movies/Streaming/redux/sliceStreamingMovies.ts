

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StreaingMovieApiResponse } from "../utils/utils";



interface InitialStateType {
    streaming: StreaingMovieApiResponse | null,
    loading: boolean,
    error: string | null
}


const initialState: InitialStateType = {
    streaming: null,
    loading: false,
    error: null
}


const sliceStreamingMovies = createSlice({
    name: 'sliceStreamingMovies',
    initialState,
    reducers: {
        fetchStreamingMovies: (state, _action) => {
            state.streaming = null;
            state.error = null;
            state.loading = true;
        },
        fetchStreamingMoviesSuccess: (state, action: PayloadAction<StreaingMovieApiResponse>) => {
            state.streaming = action.payload;
            state.error = null;
            state.loading = false;
        },
        fetchStreamingMoviesFailed: (state, action: PayloadAction<string>) => {
            state.streaming = null;
            state.error = action.payload;
            state.loading = false;
        },
        clearStateStreaming: (state, _action) => {
            state.streaming = null;
            state.error = null;
            state.loading = false;
        }
    }
})


export const { fetchStreamingMovies , fetchStreamingMoviesFailed , fetchStreamingMoviesSuccess , clearStateStreaming } = sliceStreamingMovies.actions ;
export default sliceStreamingMovies.reducer ;