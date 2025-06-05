import axios, { AxiosError } from "axios";
import type { MovieCreditsResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchCredits, fetchCreditsFailed, fetchCreditsSuccess } from "./sliceeMovieCast";

async function getCredits(id: string): Promise<MovieCreditsResponse> {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
      },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data.status_message);
    }
    throw new Error((err as AxiosError).message);
  }
}


const epicMovieCredits = (action$ : Observable<Action>) => action$.pipe(
    ofType(fetchCredits.type) ,
    mergeMap((action) => from(getCredits((action as ReturnType<typeof fetchCredits>).payload)).pipe(
        map(( res ) => fetchCreditsSuccess(res)) ,
        catchError(( err) => of(fetchCreditsFailed( err.message ))) 
    )),
    catchError(( err) => of(fetchCreditsFailed( err.message )))
)


export default epicMovieCredits ;