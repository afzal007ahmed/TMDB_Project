import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TmdbResult } from "../utils/utils";



interface InitialStateType {
    tv: TmdbResult[],
    loading: boolean,
    error: string | null
}


const initialState: InitialStateType = {
    tv: [],
    loading: false,
    error: null
}


const sliceTv = createSlice({
    name: 'sliceTv',
    initialState,
    reducers: {
        fetchTv: (state, _action : PayloadAction<{ page : number , category : string }>) => {
            state.loading = true;
        },
        fetchTvSuccess: (state, action: PayloadAction<TmdbResult[]>) => {
            state.tv = [ ...state.tv , ...action.payload];
            state.error = null;
            state.loading = false;
        },
        fetchTvFailed: (state, action: PayloadAction<string>) => {
            state.tv = [];
            state.error = action.payload;
            state.loading = false;
        },
        clearStateTv: (state, _action) => {
            state.tv = [];
            state.error = null;
            state.loading = false;
        }
    }
})


export const { fetchTv , fetchTvFailed , fetchTvSuccess , clearStateTv } = sliceTv.actions ;
export default sliceTv.reducer ;