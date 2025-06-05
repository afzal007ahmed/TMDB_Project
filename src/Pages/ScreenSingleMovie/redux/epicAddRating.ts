import type { Action } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ofType } from "redux-observable";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import {
  fetchAddRatingMovie,
  fetchAddRatingMovieFailed,
  fetchAddRatingMovieSuccess,
} from "./sliceAddRating";

async function addToFav(body: { value : number , id_type : string , id : string , series_id : string}): Promise<string> {
  try {
    let type = 'session_id' ; 
    if( body.id_type === 'guest' ){
          type = 'guest_session_id'  
    }
    const response = await axios.post(`https://api.themoviedb.org/3/movie/${body.series_id}/rating?${type}=${body.id}`, {
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

const epicAddRatingMovie = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchAddRatingMovie.type),
    mergeMap((action) => {
      const { id, id_type , value , series_id} = (
        action as ReturnType<typeof fetchAddRatingMovie>
      ).payload;
      return from(
        addToFav({
          id: id,
          id_type : id_type ,
          value : value ,
          series_id : series_id
        })
      ).pipe(
        map(() => fetchAddRatingMovieSuccess("success")),
        catchError((err) => of(fetchAddRatingMovieFailed(err.message)))
      );
    }),
    catchError((err) => of(fetchAddRatingMovieFailed(err.message)))
  );


  export default epicAddRatingMovie ;
