import axios, { AxiosError } from "axios";
import type { ReviewsResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchReview, fetchReviewFailed, fetchReviewSuccess } from "./sliceMovieReviews";


async function getReviews( id : string ) : Promise<ReviewsResponse>{
  try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1` , {
        headers : {
            Authorization : 'Bearer ' + import.meta.env.VITE_API_KEY
        }
      })
      return response.data ;
  } catch (error) {
      if( axios.isAxiosError( error ) ) {
           throw new Error(error.response?.data.status_message)
      }
      throw new Error( (error as AxiosError).message ) ;
  }
}

const epicMovieReviews = ( action$ : Observable<Action> ) => action$.pipe(
    ofType( fetchReview.type ) ,
    mergeMap(( action ) => from( getReviews((action as ReturnType<typeof fetchReview>).payload ) ).pipe(
        map((res) => fetchReviewSuccess(res)) ,
        catchError(( err ) => of(fetchReviewFailed(err.message)))
    )
),
catchError(( err) => of(fetchReviewFailed(err.message) )) 
)


export default epicMovieReviews  ;