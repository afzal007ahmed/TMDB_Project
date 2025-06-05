import axios, { AxiosError } from "axios";
import type { StreaingMovieApiResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchNowPlayingMovies, fetchNowPlayingMoviesFailed, fetchNowPlayingMoviesSuccess } from "./sliceNowPlayingMovies";


async function getStreamingMovies(page:number) : Promise<StreaingMovieApiResponse>{
  try{
      const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}` , {
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


const epicNowPlayingMovies = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchNowPlayingMovies.type) ,
    mergeMap((action) => from(getStreamingMovies((action as ReturnType<typeof fetchNowPlayingMovies>).payload)).pipe(
        map(( res ) => fetchNowPlayingMoviesSuccess(res.results) ) ,
        catchError((err) => of(fetchNowPlayingMoviesFailed(err.message))) 
    )),
    catchError((err) => of(fetchNowPlayingMoviesFailed(err.message))) 
)

export default epicNowPlayingMovies ;