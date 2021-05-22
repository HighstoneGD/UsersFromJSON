import * as actionTypes from '../actions/actionTypes'

export const setSortBy = (by) => {
    return {
        type: actionTypes.SET_SORT_BY,
        payload: {
            by
        }
    }
}

export const setSortAscendence = (ascendence) => {
    return {
        type: actionTypes.SET_SORT_ASCENDENCE,
        payload: {
            ascendence
        }
    }
}

export const setMode = (mode) => {
    return {
        type: actionTypes.SET_MODE,
        payload: {
            mode
        }
    }
}

export const setFilter = (filter) => {
    return {
        type: actionTypes.SET_FILTER,
        payload: {
            filter
        }
    }
}