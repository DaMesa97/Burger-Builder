import * as actions from '../actions/actionTypes'

const initialState = {
   token: null,
   userId: null,
   error: null,
   loading: false,
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actions.AUTH_START:
         return {
            ...state,
            loading: true
         }
      case actions.AUTH_SUCCESS:
         return {
            ...state,
            token: action.idToken,
            userId: action.userId,
            error: null,
            loading: false,
         }
      case actions.AUTH_FAIL:
         return {
            ...state,
            error: action.error,
            loading: false
         }
      case actions.AUTH_LOGOUT:
         return {
            ...state,
            token: null,
            userId: null
         }
      default: return state
   }

};

export default reducer;