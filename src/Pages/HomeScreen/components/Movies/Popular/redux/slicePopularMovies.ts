import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MovieApiResponse } from "../utils/utils";



interface InitialStateType {
    popular_movies: MovieApiResponse | null,
    loading: boolean,
    error: string | null
}


const initialState: InitialStateType = {
    popular_movies: null,
    loading: false,
    error: null
}


const slicePopularMovies = createSlice({
    name: 'slicePopularMovies',
    initialState,
    reducers: {
        fetchPopularMovies: (state, _action) => {
            state.popular_movies = null;
            state.error = null;
            state.loading = true;
        },
        fetchPopularMoviesSuccess: (state, action: PayloadAction<MovieApiResponse>) => {
            state.popular_movies = action.payload;
            state.error = null;
            state.loading = false;
        },
        fetchPopularMoviesFailed: (state, action: PayloadAction<string>) => {
            state.popular_movies = null;
            state.error = action.payload;
            state.loading = false;
        },
        clearStatePopularMovies: (state, _action) => {
            state.popular_movies = null;
            state.error = null;
            state.loading = false;
        }
    }
})


export const { fetchPopularMovies , fetchPopularMoviesFailed , fetchPopularMoviesSuccess , clearStatePopularMovies } = slicePopularMovies.actions ;
export default slicePopularMovies.reducer ;