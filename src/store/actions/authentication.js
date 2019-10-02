import * as actions from './actionTypes'
import axios from 'axios'

export const authStart = () => {
   return {
      type: actions.AUTH_START
   }
}

export const authSuccess = (token, userId) => {
   return {
      type: actions.AUTH_SUCCESS,
      idToken: token,
      userId: userId
   }
}

export const authFail = (error) => {
   return {
      type: actions.AUTH_FAIL,
      error: error
   }
}

export const checkAuthTimeout = (expirationTime) => {
   return dispatch => {
      setTimeout(() => {
         dispatch(logout())
      }, expirationTime * 1000)
   }
}

export const logout = () => {
   return {
      type: actions.AUTH_LOGOUT
   }
}

export const auth = (email, password, isSingedUp) => {
   return dispatch => {
      dispatch(authStart());
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4BHq2VEcevYg_uF6GtEcTuK5wBhGF1I4`
      if (!isSingedUp) {
         url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4BHq2VEcevYg_uF6GtEcTuK5wBhGF1I4`
      }
      axios.post(url,
         {
            email: email,
            password: password,
            returnSecureToken: true
         })
         .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
         })
         .catch(error => {
            console.log(error)
            dispatch(authFail(error.response.data.error))
         })
   }
}