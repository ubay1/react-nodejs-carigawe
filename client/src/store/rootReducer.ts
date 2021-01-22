
import { combineReducers } from 'redux'
import loading from './loading'
import toast from './toast'

const rootReducer = combineReducers({
  loading,
  toast,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
