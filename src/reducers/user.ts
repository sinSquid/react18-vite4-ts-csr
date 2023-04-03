import { createActionType } from '@utils/store'

const CHANGE_USER = createActionType('CHANGE_USER')
const changeUser =
  (params = {}) =>
  (dispatch: any) => {
    dispatch({
      payload: { ...params },
      type: createActionType,
    })
    return Promise.resolve()
  }

const initialState = {
  name: 'old abiu',
  age: 18,
}

const _ = (state = initialState, action: { type: number | string; payload: { [propName: string]: any } }) => {
  switch (action.type) {
    case CHANGE_USER:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export { _ as default, changeUser }
