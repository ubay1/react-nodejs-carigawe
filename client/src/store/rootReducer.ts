
import { combineReducers } from 'redux'
import loading from './loading'

const rootReducer = combineReducers({
  loading,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
