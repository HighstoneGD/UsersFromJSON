import { actionTypes } from '../actions'

const initialState = {
    users: []
}

export const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_DATA:
            return {
                users: [...action.payload.data]
            }
        default: return state
    }
}