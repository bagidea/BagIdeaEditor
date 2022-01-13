import { combineReducers } from '@reduxjs/toolkit'

import context3DSlice from './slices/context_3d'

const rootReducers = combineReducers({
    context3DSlice
})

export type RootState = ReturnType<typeof rootReducers>
export default rootReducers