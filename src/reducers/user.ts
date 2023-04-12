import { AnyAction } from 'redux'
import { createActionType } from '@utils/store'

const CHANGE_USER = createActionType('CHANGE_USER')
const changeUser = (params: { [key: string]: string | number }): AnyAction => {
  return {
    payload: { ...params },
    type: CHANGE_USER,
  }
}

const initialState = {
  name: 'old abiu',
  age: 18,
}

const _ = (state = initialState, action: { type: number | string; payload: { [key: string]: string | number } }) => {
  switch (action.type) {
    case CHANGE_USER:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export { _ as default, changeUser }
