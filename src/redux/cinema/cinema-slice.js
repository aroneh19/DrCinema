import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken, baseUrl } from '../auth/auth.js';

const cinemaSlice = createSlice({
  name: 'cinema',
  initialState: {
    cinemas: [],
    cinemasError: undefined
  },
  reducers: {
    getCinemasReceived: (state, action) => {
      state.cinemasError = undefined;
      state.cinemas = action.payload;
    },
    getCinemasError: (state, action) => {
      state.cinemasError = action.payload;
    }
  }
});

const {
  getCinemasReceived,
  getCinemasError
} = cinemaSlice.actions;

export function getCinemas () {
  return async (dispatch) => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(`${baseUrl}/theaters`, {
        method: 'GET',
        headers: {
          'x-access-token': accessToken
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cinemas = await response.json();
      dispatch(getCinemasReceived(cinemas));
    } catch (err) {
      dispatch(getCinemasError(err.toString()));
    }
  };
}

export default cinemaSlice.reducer;
