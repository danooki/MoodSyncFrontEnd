const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("API URL is required, are you missing a .env file?");
}

export const BASE_URL = API_URL;
