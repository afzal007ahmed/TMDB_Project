import axios, { AxiosError } from "axios";
import type { TopRatedMoviesResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchTopRatedMovies2, fetchTopRatedMovies2Failed, fetchTopRatedMovies2Success } from "./sliceTopRatedMovies";

async function getTopRatedMovies(page: number): Promise<TopRatedMoviesResponse> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
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

const epicTopRatedMovies2 = ( action$ : Observable<Action>) => action$.pipe(
    ofType(fetchTopRatedMovies2.type ) ,
    mergeMap((action) => from(getTopRatedMovies(( action as ReturnType< typeof fetchTopRatedMovies2>).payload )).pipe(
        map((res) => fetchTopRatedMovies2Success(res.results)),
        catchError((err) => of(fetchTopRatedMovies2Failed(err.message)))
    )),
    catchError((err) => of(fetchTopRatedMovies2Failed(err.message)))
)
export default epicTopRatedMovies2