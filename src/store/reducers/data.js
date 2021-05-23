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
        case actionTypes.TOGGLE_FAVOURITE: {
            state.users.forEach(user => { if (user.id === action.payload.id) user.favourite = !user.favourite })
            return {
                users: [...state.users]
            }
        }
        default: return state
    }
}