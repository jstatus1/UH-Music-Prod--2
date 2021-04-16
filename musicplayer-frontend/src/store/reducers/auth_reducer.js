import * as ACTION_TYPES from '../actions/action_types'


const AuthReducer = (state = null, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCH_USER:
        return action.payload || false

    
      default:
        return state
    }
}

export default AuthReducer;