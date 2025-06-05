import axios, { AxiosError } from "axios";
import type { UpcomingMovieResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchUpcomingMovies, fetchUpcomingMoviesFailed, fetchUpcomingMoviesSuccess } from "./sliceUpcomingMovies";


async function getUpcomingMovies() : Promise<UpcomingMovieResponse>{
  try{
      const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1' , {
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


const epicUpcomingMovies = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchUpcomingMovies.type) ,
    mergeMap(() => from(getUpcomingMovies()).pipe(
        map(( res ) => fetchUpcomingMoviesSuccess(res) ) ,
        catchError((err) => of(fetchUpcomingMoviesFailed(err.message))) 
    )),
    catchError((err) => of(fetchUpcomingMoviesFailed(err.message))) 
)

export default epicUpcomingMovies ;