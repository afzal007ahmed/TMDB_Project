import type { Action } from "@reduxjs/toolkit";
import { ofType, type Epic } from "redux-observable";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import { fetchGuestSessionId, fetchGuestSessionIdFailed, fetchGuestSessionIdSuccess } from "./sliceGuestSessionId";
import axios, { AxiosError } from "axios";
import type { RootState } from "@/rootReducers";

interface ResponseBody {
 success : boolean ,
 guest_session_id : string,
 expires_at : string
}

async function getSessionId() : Promise<ResponseBody> {
    try{
        const response = await axios.get('https://api.themoviedb.org/3/authentication/guest_session/new' ,{
            headers : {
                    Authorization : `Bearer ${import.meta.env.VITE_API_KEY}`
                }
        }
    )
     return response.data ;
    }
 catch(err) {
       if( axios.isAxiosError(err) ) {
         throw new Error(err.response?.data.status_message)
       }
       throw new Error(( err as AxiosError).message) ;
 }
}

const epicGuestSessionId : Epic< any ,any , RootState> = ( action$ : Observable<Action> ) => action$.pipe(
    ofType( fetchGuestSessionId.type ) ,
    mergeMap(() => from(getSessionId()).pipe(
        map(( res ) => {
            return fetchGuestSessionIdSuccess( { session_id : res.guest_session_id , expiry_id : res.expires_at } ) ;
        }),
        catchError((err) => of(fetchGuestSessionIdFailed(err.message))) 
    )),
    catchError((err) => of( fetchGuestSessionIdFailed(err.message))) 
)


export default epicGuestSessionId ;