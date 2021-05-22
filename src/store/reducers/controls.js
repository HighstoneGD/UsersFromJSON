import { actionTypes } from '../actions'

const initialState = {
    input: null,
    sortControls: { by: 'id', ascendence: 'ascend' },
    modeControls: { mode: 'table' }
}

export const controlsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_SORT_BY:
            return {
                ...state,
                sortControls: {
                    ...state.sortControls,
                    by: action.payload.by
                }
            }
        case actionTypes.SET_SORT_ASCENDENCE:
            return {
                ...state,
                sortControls: {
                    ...state.sortControls,
                    ascendence: action.payload.ascendence
                }
            }
        case actionTypes.SET_MODE:
            return {
                ...state,
                modeControls: {
                    ...state.modeControls,
                    mode: action.payload.mode
                }
            }
        default: return state
    }
}