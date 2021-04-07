import { BaseAction } from './generalActions'
import { User } from '../state/userState'

export enum UserActionTypes {
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT"
}
export interface UserLoginAction extends BaseAction<UserActionTypes.USER_LOGIN> {
  payload: User
}

export const loginUser = (user: User): UserLoginAction => {
  return {
    type: UserActionTypes.USER_LOGIN,
    payload: user
  }
} 

export interface UserLogoutAction extends BaseAction<UserActionTypes.USER_LOGOUT> {}

export const logoutUser = (): UserLogoutAction => {
  return {
    type: UserActionTypes.USER_LOGOUT
  }
}

export type UserActions = UserLoginAction | UserLogoutAction