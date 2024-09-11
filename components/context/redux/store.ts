import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import themeReducer from './reducers/themeReducer'
import { createWrapper } from 'next-redux-wrapper'

export const store = () => {
  return configureStore({
    reducer: {
      authReducer,
      themeReducer
    }
  })
}

// Infer the type of makeStore

export const wrapper = createWrapper(store)
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']