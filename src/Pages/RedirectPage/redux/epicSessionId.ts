import type { Action } from "@reduxjs/toolkit";
import { ofType, type Epic } from "redux-observable";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import { fetchSessionId, fetchSessionIdFailed, fetchSessionIdSuccess } from "./sliceSessionId";
import axios, { AxiosError } from "axios";
import type { RootState } from "@/rootReducers";

interface ResponseBody {
 success : boolean ,
 session_id : string
}

async function getSessionId() : Promise<ResponseBody> {
    try{
        const response = await axios.post('https://api.themoviedb.org/3/authentication/session/new' , {
            request_token : localStorage.getItem('requestToken')
        },{
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

const epicSessionId : Epic< any ,any , RootState> = ( action$ : Observable<Action> ) => action$.pipe(
    ofType( fetchSessionId.type ) ,
    mergeMap(() => from(getSessionId()).pipe(
        map(( res ) => {
            return fetchSessionIdSuccess( res.session_id ) ;
        }),
        catchError((err) => of(fetchSessionIdFailed(err.message))) 
    )),
    catchError((err) => of( fetchSessionIdFailed(err.message))) 
)


export default epicSessionId ;