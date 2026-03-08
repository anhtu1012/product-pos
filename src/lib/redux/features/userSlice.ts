import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../RootReducer'

const initialState: any = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: any, actions: any) => actions.payload,
    logout: () => initialState,
  },
})
export const { login, logout } = userSlice.actions
export const selectUser = (store: RootState) => store.user
export default userSlice.reducer
