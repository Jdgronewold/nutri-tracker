import React, { useReducer, useState, useEffect } from 'react'

import { UserActions, UserActionTypes } from '../actions/userActions'
import { getUser } from '../utils/userUtils'
// import { getTokenAndUser } from '../utils/userUtils'

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  uid?: string;
}

export interface TokenData {
  token: string
  expiresIn: string
}

export const defaultUser: User = {
  firstName: '',
  lastName: '',
  email: '',
}

interface UserState {
  user: User
}

type UserContextType = { user: User, userDispatch: React.Dispatch<UserActions>}

export const UserContext = React.createContext<UserContextType>({ user: defaultUser, userDispatch: () => {}})

function userReducer(state: UserState, action: UserActions): UserState {
  switch(action.type) {
    case UserActionTypes.USER_LOGIN: {
      return { user: action.payload }
    }
    case UserActionTypes.USER_LOGOUT: {
      return { user: defaultUser }
    }
    default:
      return state
  }
}

export const UserProvider: React.FunctionComponent = ({ children }) => {
  const [ { user }, userDispatch] = useReducer(userReducer, { user: null })
  const [contextValue, setContext] = useState<UserContextType>({ user, userDispatch })

  useEffect(() => {
    setContext((contextValue: UserContextType) => ({
      ...contextValue,
      user
    }))
  }, [user])

  return (
    <UserContext.Provider value={contextValue}>
      { children }
    </UserContext.Provider>
  )
}