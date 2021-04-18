import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import AudioUploadReducer from './audioupload_reducer';



const rootReducer = combineReducers({
  auth_reducer: AuthReducer
})

export default rootReducer;