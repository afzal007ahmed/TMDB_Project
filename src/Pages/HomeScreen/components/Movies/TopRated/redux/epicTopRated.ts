import axios, { AxiosError } from "axios";
import type { TopRatedMoviesResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchTopRatedMovies, fetchTopRatedMoviesFailed, fetchTopRatedMoviesSuccess } from "./sliceTopRated";

async function getTopRatedMovies(): Promise<TopRatedMoviesResponse> {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      {
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
        },
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data.status_message);
    }
    throw new Error((err as AxiosError).message);
  }
}

const epicTopRatedMovies = ( action$ : Observable<Action>) => action$.pipe(
    ofType(fetchTopRatedMovies.type ) ,
    mergeMap(() => from(getTopRatedMovies()).pipe(
        map((res) => fetchTopRatedMoviesSuccess(res)),
        catchError((err) => of(fetchTopRatedMoviesFailed(err.message)))
    )),
    catchError((err) => of(fetchTopRatedMoviesFailed(err.message)))
)
export default epicTopRatedMovies