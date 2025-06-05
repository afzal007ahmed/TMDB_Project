import type { Action } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ofType } from "redux-observable";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import {
  fetchAddRatingTv,
  fetchAddRatingTvFailed,
  fetchAddRatingTvSuccess,
} from "./sliceAddRating";

async function addToFav(body: { value : number , id_type : string , id : string , series_id : string}): Promise<string> {
  try {
    let type = 'session_id' ; 
    if( body.id_type === 'guest' ){
          type = 'guest_session_id'  
    }
    const response = await axios.post(`https://api.themoviedb.org/3/tv/${body.series_id}/rating?${type}=${body.id}`, {
         value : body.value
    } ,
         {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.status_message);
    }
    throw new Error((error as AxiosError).message);
  }
}

const epicAddRatingTv = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchAddRatingTv.type),
    mergeMap((action) => {
      const { id, id_type , value , series_id} = (
        action as ReturnType<typeof fetchAddRatingTv>
      ).payload;
      return from(
        addToFav({
          id: id,
          id_type : id_type ,
          value : value ,
          series_id : series_id
        })
      ).pipe(
        map(() => fetchAddRatingTvSuccess("success")),
        catchError((err) => of(fetchAddRatingTvFailed(err.message)))
      );
    }),
    catchError((err) => of(fetchAddRatingTvFailed(err.message)))
  );


  export default epicAddRatingTv ;
