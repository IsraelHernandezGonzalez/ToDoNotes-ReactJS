export const reducer = (state, action) => {
    switch (action.type) {
        case "setAuthentication":
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                userName: action.userName,
                token: action.token
            }
        case "reset":
            return {
                ...state,
                isAuthenticated: false,
                userName: null,
                token: null
            }    
  
      default:
        return state
    }
  }
  
  export const initialState = {
    isAuthenticated: false,
    userName: null,
    token: null
  }