/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PageActive {
    ispage: string,
}

const initialState: PageActive = {
    ispage: 'beranda',
}

// Slice
const PageActiveSlice = createSlice({
  name: 'loadingScreen',
  initialState ,
  reducers: {
    setPageActive(state, action: PayloadAction<PageActive>) {
        state.ispage = action.payload.ispage
    },
  },
});

// Actions
export const { setPageActive } = PageActiveSlice.actions
export default PageActiveSlice.reducer