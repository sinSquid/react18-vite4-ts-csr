import { v4 as uuid } from 'uuid'

const createActionTypes = (type = '') => {
  const t = type.toUpperCase()
  const id = uuid()
  return {
    REQUEST: `${t}_REQUEST_${id}`,
    SUCCESS: `${t}_SUCCESS_${id}`,
    FAILURE: `${t}_FAILURE_${id}`,
  }
}

const createActionType = (type = '') => {
  return `${type.toUpperCase()}_${uuid()}`
}

export { createActionTypes, createActionType }
