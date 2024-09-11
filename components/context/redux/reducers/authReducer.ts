import { createSlice, createStore, Store } from "@reduxjs/toolkit"
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
export interface AuthReducerState {
    authorized: boolean
}

const initialState: AuthReducerState = {
    authorized: false
}




export const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setAuthorized: (state) => {
            state.authorized = true
        },
        unsetAuthorized: (state) => {
            state.authorized = false
        }
    }
})

const makeStore = (context: Context) => createStore(authReducer.reducer);


export const wrapper = createWrapper<Store<AuthReducerState>>(makeStore, {debug: true});

export const {setAuthorized, unsetAuthorized} = authReducer.actions

export default authReducer.reducer