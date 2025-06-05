import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PopularMovie } from "../utils/utils";



interface InitialStateType {
    popular_movies: PopularMovie[],
    loading: boolean,
    error: string | null
}


const initialState: InitialStateType = {
    popular_movies: [],
    loading: false,
    error: null
}


const slicePopularMovies2 = createSlice({
    name: 'slicePopularMovies2',
    initialState,
    reducers: {
        fetchPopularMovies2: (state, _action : PayloadAction<number>) => {
            state.loading = true;
        },
        fetchPopularMovies2Success: (state, action: PayloadAction<PopularMovie[]>) => {
            state.popular_movies = [ ...state.popular_movies , ...action.payload];
            state.error = null;
            state.loading = false;
        },
        fetchPopularMovies2Failed: (state, action: PayloadAction<string>) => {
            state.popular_movies = [];
            state.error = action.payload;
            state.loading = false;
        },
        clearStatePopularMovies2: (state, _action) => {
            state.popular_movies = [];
            state.error = null;
            state.loading = false;
        }
    }
})


export const { fetchPopularMovies2 , fetchPopularMovies2Failed , fetchPopularMovies2Success , clearStatePopularMovies2 } = slicePopularMovies2.actions ;
export default slicePopularMovies2.reducer ;