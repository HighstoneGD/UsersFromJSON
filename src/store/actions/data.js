import { actionTypes } from '../actions'

export const setData = (data) => {
    return {
        type: actionTypes.SET_DATA,
        payload: { data }
    }
}