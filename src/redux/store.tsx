import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import rootReducers from './reducers'
import rootContext3D from './slices/context_3d/saga'

const saga = createSagaMiddleware()
const store = configureStore({
    reducer: rootReducers,
    middleware: [saga]
})

saga.run(rootContext3D)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store