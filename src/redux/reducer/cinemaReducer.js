// redux/reducer/cinemaReducer.js
import {
    FETCH_CINEMAS_REQUEST,
    FETCH_CINEMAS_SUCCESS,
    FETCH_CINEMAS_FAILURE,
} from "../actions/cinemaActions";

const initialState = {
    cinemas: [],
    loading: false,
    error: null,
};

const cinemaReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CINEMAS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_CINEMAS_SUCCESS:
            return {
                ...state,
                loading: false,
                cinemas: action.payload,
            };
        case FETCH_CINEMAS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default cinemaReducer;
