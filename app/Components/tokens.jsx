import { useState, useEffect, useCallback } from "react";
import jwt from "jsonwebtoken";
import { checkToken } from "./Useful";
import axios from "axios";
import { API } from "@/Essentials";

const useTokenAndData = () => {
	const [isValid, setIsValid] = useState(false);

	const [token, setToken] = useState(null)
	const [data, setData] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem(`atoken`)
		setToken(token)
	}, [])

	const refreshAccessToken = useCallback(async (refreshToken) => {
		try {
			// const res = await refreshedtokenAgain({ refresh_token: refreshToken });
			const res = await axios.post(`${API}/refresh`, { refresh_token: refreshToken })
			const { access_token, success } = res.data;
			if (success) {
				return { access_token, refresh_token: refreshToken };
			} else {
				console.error("Failed to refresh token");
				return Promise.reject("Failed to refresh token");
			}
		} catch (err) {
			console.error(err);
			return Promise.reject("Failed to refresh token");
		}
	}, []);


	const checkRefreshTokenValidity = useCallback(() => {
		try {
			const refreshToken = localStorage.getItem(`rtoken`)
			// const refreshToken = Cookies.get(`rtoken${}`)
			if (!refreshToken) {
				console.error("No refresh token found");
				return false;
			}
			const decodedRefreshToken = jwt.decode(refreshToken);
			const currentTimestamp = Math.floor(Date.now() / 1000);
			const expiration = decodedRefreshToken.exp;
			const isValid = currentTimestamp <= expiration;
			return isValid;
		} catch (error) {
			console.error("Error checking refresh token validity:", error);
			return false;
		}
	}, []);

	const refresh = useCallback(async () => {
		const refreshToken = localStorage.getItem(`rtoken`)
		// const refreshToken = Cookies.get(`rtoken${}`)
		if (!refreshToken) {
			console.error("No refresh token found");
			return Promise.reject("No refresh token found");
		}
		try {
			const newToken = await refreshAccessToken(refreshToken);
			if (newToken) {
				localStorage.setItem(`atoken`, newToken.access_token)
				// Cookies.set(`atoken${}`, newToken.access_token)
			}
		} catch (error) {
			console.error("Error during token refresh:", error);
		}
	}, [refreshAccessToken]);

	const generateData = useCallback(
		async () => {
			try {
				if (token) {
					const { check, payload } = await checkToken(token)
					if (check) {

						setIsValid(true);
						setData(payload)
					} else if (checkRefreshTokenValidity()) {
						await refresh()
					} else {
						setIsValid(false);
						localStorage.removeItem(`atoken`)
						localStorage.removeItem(`rtoken`)

					}
				}
			} catch (e) {
				console.error(e);
				setIsValid(false);
				localStorage.removeItem(`atoken`)
				localStorage.removeItem(`rtoken`)
			}
		},
		[token]
	);

	useEffect(() => {
		generateData();
	}, [token]);

	return { isValid, data, generateData };
};

export default useTokenAndData;
