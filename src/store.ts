import { configureStore, type Action } from "@reduxjs/toolkit";
import { createEpicMiddleware, type Epic } from "redux-observable";
import Epics from "./rootEpics";
import type { RootState } from "./rootReducers";
import rootReducer from "./rootReducers";

const epicMiddleWare = createEpicMiddleware<Action , Action , RootState>() ;
type AppEpic = Epic<Action, Action, RootState>;
const store = configureStore({
    reducer : rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(epicMiddleWare)
})

epicMiddleWare.run(Epics as unknown as AppEpic) ;
export default store ;