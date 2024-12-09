import axios from "axios";
import { getAccessToken, baseUrl } from "../auth/auth";

export const FETCH_CINEMAS_REQUEST = "FETCH_CINEMAS_REQUEST";
export const FETCH_CINEMAS_SUCCESS = "FETCH_CINEMAS_SUCCESS";
export const FETCH_CINEMAS_FAILURE = "FETCH_CINEMAS_FAILURE";

export const fetchCinemas = () => async (dispatch) => {
    dispatch({ type: FETCH_CINEMAS_REQUEST });

    try {
        // Get the token
        const token = await getAccessToken();

        // Fetch cinemas with the token
        const response = await axios.get(`${baseUrl}/theaters`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)

        dispatch({ type: FETCH_CINEMAS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_CINEMAS_FAILURE, payload: error.message });
    }
};
