import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Review, type ReviewsResponse } from '../utils/utils'

interface InitialStateType {
  reviews: Review[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialStateType = {
  reviews: null,
  loading: false,
  error: null,
};

const sliceTvReviews = createSlice({
  name: "sliceTvReviews",
  initialState,
  reducers: {
    fetchTvReviews: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.reviews = null;
    },
    fetchTvReviewsSuccess: (state, action: PayloadAction<ReviewsResponse>) => {
      state.loading = false;
      state.error = null;
      state.reviews = action.payload.results;
    },
    fetchTvReviewsFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.reviews = null;
    },
    clearStateTvReviews : ( state , _action) => {
        state.loading = false;
        state.error = null;
        state.reviews = null;
    }
  }
});

export const { fetchTvReviews , fetchTvReviewsFailed , fetchTvReviewsSuccess , clearStateTvReviews } = sliceTvReviews.actions ;
export default sliceTvReviews.reducer
