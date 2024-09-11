import { createSlice } from "@reduxjs/toolkit"

export interface ThemeReducerState {
    mode: 'Dark' | 'Light'
}

const initialState: ThemeReducerState = {
    mode: 'Dark'
}


export const themeReducer = createSlice({
    name: 'themeReducer',
    initialState,
    reducers: {
        switchMode: (state) => {
            if(state.mode === 'Dark') {
                state.mode = 'Light'
            }
            else {
                state.mode = 'Dark'
            }
        },
    }
})

export const {switchMode} = themeReducer.actions

export default themeReducer.reducer