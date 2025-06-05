

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NowPlayingMovie } from "../utils/utils";



interface InitialStateType {
    streaming: NowPlayingMovie[],
    loading: boolean,
    error: string | null
}


const initialState: InitialStateType = {
    streaming: [],
    loading: false,
    error: null
}


const sliceNowPlayingMovies = createSlice({
    name: 'sliceNowPlayingMovies',
    initialState,
    reducers: {
        fetchNowPlayingMovies: (state, _action:PayloadAction<number>) => {
            state.loading = true;
        },
        fetchNowPlayingMoviesSuccess: (state, action: PayloadAction<NowPlayingMovie[]>) => {
            state.streaming = [...state.streaming  , ...action.payload];
            state.error = null;
            state.loading = false;
        },
        fetchNowPlayingMoviesFailed: (state, action: PayloadAction<string>) => {
            state.streaming = [];
            state.error = action.payload;
            state.loading = false;
        },
        clearStateNowPlayingMovies: (state, _action) => {
            state.streaming = [];
            state.error = null;
            state.loading = false;
        }
    }
})


export const { fetchNowPlayingMovies , fetchNowPlayingMoviesFailed , fetchNowPlayingMoviesSuccess , clearStateNowPlayingMovies } = sliceNowPlayingMovies.actions ;
export default sliceNowPlayingMovies.reducer ;