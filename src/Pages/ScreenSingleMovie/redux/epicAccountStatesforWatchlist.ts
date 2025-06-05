import axios, { AxiosError } from "axios";
import type { MovieAccountStates } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchAccountStatesforWatchlist, fetchAccountStatesforWatchlistFailed, fetchAccountStatesforWatchlistSuccess } from "./sliceAccountStateforWatchlist";


async function getAccountSatatesforWatchlist(body : { session_id : string , media_id : number} ) : Promise<MovieAccountStates>{
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${body.media_id}/account_states?session_id=${body.session_id}` , {
            headers : {
                Authorization : 'Bearer ' + import.meta.env.VITE_API_KEY
            }
        })
        return response.data
    } catch (error) {
        if( axios.isAxiosError(error) ){
            throw new Error( error.response?.data.status_message ) ;
        }
        throw new Error( (error as AxiosError).message ) ;
    }
}


const epicAccountStatesforWatchlist = (action$ : Observable<Action>) => action$.pipe(
    ofType( fetchAccountStatesforWatchlist.type ) ,
    mergeMap(( action ) => {
        const { media_id , session_id } = (action as ReturnType<typeof fetchAccountStatesforWatchlist > ).payload ;
        return from( getAccountSatatesforWatchlist({ session_id : session_id , media_id : media_id })).pipe(
            map(( res ) => fetchAccountStatesforWatchlistSuccess(res)),
            catchError(( err ) => of( fetchAccountStatesforWatchlistFailed( err.message )))
        )
    }),
    catchError(( err ) => of( fetchAccountStatesforWatchlistFailed( err.message )))
)

export default epicAccountStatesforWatchlist