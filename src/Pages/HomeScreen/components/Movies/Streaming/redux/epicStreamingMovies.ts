import axios, { AxiosError } from "axios";
import type { StreaingMovieApiResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchStreamingMovies, fetchStreamingMoviesFailed, fetchStreamingMoviesSuccess } from "./sliceStreamingMovies";



async function getStreamingMovies() : Promise<StreaingMovieApiResponse>{
  try{
      const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1' , {
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


const epicStreamingMovies = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchStreamingMovies.type) ,
    mergeMap(() => from(getStreamingMovies()).pipe(
        map(( res ) => fetchStreamingMoviesSuccess(res) ) ,
        catchError((err) => of(fetchStreamingMoviesFailed(err.message))) 
    )),
    catchError((err) => of(fetchStreamingMoviesFailed(err.message))) 
)

export default epicStreamingMovies ;