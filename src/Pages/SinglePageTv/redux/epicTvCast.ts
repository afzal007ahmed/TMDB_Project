import axios, { AxiosError } from "axios";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import type { TVCredits } from "../utils/utils";
import { fetchTvCast, fetchTvCastFailed, fetchTvCastSuccess } from "./sliceTvCast";

async function getTvCredits(id: string): Promise<TVCredits> {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US`, {
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


const epicTvCast = (action$ : Observable<Action>) => action$.pipe(
    ofType(fetchTvCast.type) ,
    mergeMap((action) => from(getTvCredits((action as ReturnType<typeof fetchTvCast>).payload)).pipe(
        map(( res ) => fetchTvCastSuccess(res)) ,
        catchError(( err) => of(fetchTvCastFailed( err.message ))) 
    )),
    catchError(( err) => of(fetchTvCastFailed( err.message )))
)


export default epicTvCast ;