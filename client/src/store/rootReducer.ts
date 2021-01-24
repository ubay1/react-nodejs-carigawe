
import { combineReducers } from 'redux'
import loadingReducer from './loading'
import loadingScreenHomeReducer from './loadingScreenHome'
import userReducer from './user'

const rootReducer = combineReducers({
  loading: loadingReducer,
  loadingScreenHome: loadingScreenHomeReducer,
  user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
