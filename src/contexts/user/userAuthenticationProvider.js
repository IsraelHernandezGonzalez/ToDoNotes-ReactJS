import React from "react"
import { reducer, initialState } from "./reducer"

export const UserAuthenticationContext = React.createContext({
  state: initialState,
  dispatch: () => null
})

export const UserAuthenticationProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <UserAuthenticationContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </UserAuthenticationContext.Provider>
  )
}