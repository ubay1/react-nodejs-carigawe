/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ToastState {
    show: boolean,
    message: string
}

const initialState: ToastState = {
    show: false,
    message: ''
}

// Slice
const toastSlice = createSlice({
  name: 'toast',
  initialState ,
  reducers: {
    setToast(state, action: PayloadAction<ToastState>) {
        state.show = action.payload.show
        state.message = action.payload.message
    },
    setToastShow(state, action: PayloadAction<boolean>) {
      state.show = action.payload
      if(action.payload===false){
          state.message=''
      }
    },
  },
});

// Actions
export const { setToast, setToastShow } = toastSlice.actions
export default toastSlice.reducer