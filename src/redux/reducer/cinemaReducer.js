// reducer/cinemaReducer.js
const initialCinemaState = {}; // Example initial state

const cinemaReducer = (state = initialCinemaState, action) => {
    switch (action.type) {
        // Add cases for handling actions here
        default:
            return state; // Return current state by default
    }
};

export default cinemaReducer;
