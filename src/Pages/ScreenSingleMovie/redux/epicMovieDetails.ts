import axios, { AxiosError } from "axios";
import type { MovieDetails } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchMovieDetails, fetchMovieDetailsFailed, fetchMovieDetailsSuccess } from "./sliceMovieDetails";

async function getMovieDetails(id : string) : Promise<MovieDetails>{
  try{
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US` , {
        headers : {
           Authorization :  'Bearer '+ import.meta.env.VITE_API_KEY
        }
      });
      return  response.data ; 
  }
  catch(err) {
       if( axios.isAxiosError( err ) ) {
         throw new Error( err.response?.data.status_message ) ;
       }
       throw new Error( (err as AxiosError ).message ) ;
  }
}


const epicMovieDetails = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchMovieDetails.type) ,
    mergeMap((action) => from(getMovieDetails((action as ReturnType<typeof fetchMovieDetails>).payload)).pipe(
        map(( res ) => fetchMovieDetailsSuccess(res) ) ,
        catchError((err) => of(fetchMovieDetailsFailed(err.message))) 
    )),
    catchError((err) => of(fetchMovieDetailsFailed(err.message))) 
)

export default epicMovieDetails ;