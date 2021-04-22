import * as ACTION_TYPES from '../actions/action_types'


export const AuthReducer = (state = null, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCH_USER:
        return action.payload || false

     case "SIGN_OUT":
      localStorage.setItem('state', null)
      return action.payload || false
    
      default:
        return state
    }
}


