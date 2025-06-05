import axios, { AxiosError } from "axios";
import type { MovieApiResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchPopularMovies, fetchPopularMoviesFailed, fetchPopularMoviesSuccess } from "./slicePopularMovies";



async function getPopularMovies() : Promise<MovieApiResponse>{
  try{
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' , {
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


const epicPopularMovies = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchPopularMovies.type) ,
    mergeMap(() => from(getPopularMovies()).pipe(
        map(( res ) => fetchPopularMoviesSuccess(res) ) ,
        catchError((err) => of(fetchPopularMoviesFailed(err.message))) 
    )),
    catchError((err) => of(fetchPopularMoviesFailed(err.message))) 
)

export default epicPopularMovies ;