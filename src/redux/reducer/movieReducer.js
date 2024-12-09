// reducer/movieReducer.js
const initialMovieState = []; // Example initial state, can be an empty array or object

const movieReducer = (state = initialMovieState, action) => {
    switch (action.type) {
        // Add cases for handling actions here
        default:
            return state; // Return current state by default
    }
};

export default movieReducer;
