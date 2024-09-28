import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
export const checkToken = async (token) => {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken && decodedToken.header && decodedToken.payload) {
      const issuedAt = decodedToken.payload.iat;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const isValidIat = issuedAt <= currentTimestamp;
      const expiration = decodedToken.payload.exp;
      const isValidExp = currentTimestamp <= expiration;
      if (isValidIat && isValidExp) {
        return { check: true, payload: decodedToken.payload };
      } else {
        Cookies.remove("USER_ACCESS_TOKEN");
        Cookies.remove("USER_REFRESH_TOKEN");
        return { check: false, payload: "" };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
