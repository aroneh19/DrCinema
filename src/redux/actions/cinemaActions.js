import { getAccessToken, baseUrl } from "../auth/auth.js";
import { getCinemasReceived, getCinemasError } from "../reducer/cinemaReducer";

export function getCinemas() {
	return async (dispatch) => {
		try {
			const accessToken = await getAccessToken();
			const response = await fetch(`${baseUrl}/theaters`, {
				method: "GET",
				headers: {
					"x-access-token": accessToken,
				},
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const cinemas = await response.json();
			dispatch(getCinemasReceived(cinemas));
		} catch (err) {
			dispatch(getCinemasError(err.toString()));
		}
	};
}
