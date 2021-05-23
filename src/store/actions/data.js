import { actionTypes } from '../actions'

export const setData = (data) => {
    return {
        type: actionTypes.SET_DATA,
        payload: { data }
    }
}

export const toggleFavourite = (id) => {
    return {
        type: actionTypes.TOGGLE_FAVOURITE,
        payload: { id }
    }
}