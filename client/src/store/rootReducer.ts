
import { combineReducers } from 'redux'
import loadingReducer from './loading'
import loadingScreenHomeReducer from './loadingScreenHome'
import userReducer from './user'
import pageActiveReducer from './pageActive'

const rootReducer = combineReducers({
  loading: loadingReducer,
  loadingScreenHome: loadingScreenHomeReducer,
  user: userReducer,
  pageActive: pageActiveReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
