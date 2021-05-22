import { actionTypes } from '../actions'

const initialState = {}

export const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_DATA:
            return {
                ...action.payload.data
            }
        default: return state
    }
}