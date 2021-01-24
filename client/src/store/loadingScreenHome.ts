/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LoadingScreenHome {
    show: boolean,
}

const initialState: LoadingScreenHome = {
    show: true,
}

// Slice
const loadingScreenHomeSlice = createSlice({
  name: 'loadingScreen',
  initialState ,
  reducers: {
    setLoadingScreenHome(state, action: PayloadAction<LoadingScreenHome>) {
        state.show = action.payload.show
    },
  },
});

// Actions
export const { setLoadingScreenHome } = loadingScreenHomeSlice.actions
export default loadingScreenHomeSlice.reducer