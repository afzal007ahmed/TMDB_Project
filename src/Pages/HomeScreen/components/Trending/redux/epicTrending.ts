import axios, { AxiosError } from "axios";
import type { MediaResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchTrending, fetchTrendingFailed, fetchTrendingSuccess } from "./sliceTrending";



async function getTrendings( value : string ) : Promise<MediaResponse> {
    try {
        
        const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?language=en-US&time_window=${value}` , {
            headers : {
                Authorization : 'Bearer ' + import.meta.env.VITE_API_KEY 
            }
        })
        return response.data ;

    } catch (error) {
         if( axios.isAxiosError( error ) ) {
            throw new Error( error.response?.data.status_message);
         }
         throw new Error( (error as AxiosError).message) ;
    }
}


const epicTrendings = ( action$ : Observable<Action>) => action$.pipe(
    ofType(fetchTrending.type) ,
    mergeMap(( action ) => from( getTrendings((action as ReturnType<typeof fetchTrending>).payload)).pipe(
        map(( res ) => fetchTrendingSuccess(res)) ,
        catchError(( err) => of(fetchTrendingFailed(err.message))) 
    )),
    catchError(( err) => of(fetchTrendingFailed(err.message))) 
)


export default epicTrendings ;