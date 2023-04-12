import { AnyAction } from 'redux'

export interface ReduxAction<T> extends AnyAction {
  type: string
  payload: T
}

export interface UserInfo<T> {
  type: string
  payload: T
}
