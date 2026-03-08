import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import posReducer from './features/posSlice'

const rootReducer = combineReducers({
  user: userReducer,
  pos: posReducer,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
