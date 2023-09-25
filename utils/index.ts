import { ProfileProps, RowProps } from "@/types";
import axios from "./axios";
export const getHeroMovie = async (
  type: "movie" | "tv" | "all",
  genre: string = ""
) => {
  try {
    const endpoint = apiRequest(type, genre);
    const response = await axios.get(endpoint);
    const movie = response.data.results[0];
    return { statusCode: response.status, data: movie };
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      data: error.response?.status_message || "An error occurred",
    };
  }
};

export const getProfile = (
  profileID: string | undefined | null,
  profiles: ProfileProps[]
) => {
  const profile = profiles.find((profile) => profile.id === profileID);
  return profile;
};
export const apiRequest = (
  type: RowProps["type"],
  genre: RowProps["genre"]
) => {
  const baseEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  let endpoint = `trending/${type}/day?language=en-US`;
  if ("trending" === genre) {
    endpoint = `trending/${type}/day?language=en-US`;
  } else if ("popular" === genre) {
    endpoint = `${type}/popular?language=en-US&page=1`;
  } else if (genre) {
    endpoint = `discover/${type}?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`;
  } else {
    endpoint = `discover/${type}?include_adult=false&language=en-US&page=1&sort_by=popularity.desc`;
  }
  return baseEndpoint + endpoint;
};
export const getData = async (
  type: RowProps["type"],
  genre: RowProps["genre"]
) => {
  try {
    const endpoint = apiRequest(type, genre);
    const response = await axios.get(endpoint);
    const movie = response.data.results;
    console.log(movie);

    return movie;
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      data: error.response?.status_message || "An error occurred",
    };
  }
};
export const getMovie = async (type: "movie" | "tv" | "all", id: number) => {
  try {
    const endpoint =
      "movie" == type
        ? process.env.NEXT_PUBLIC_API_ENDPOINT + `movie/${id}?language=en-US`
        : process.env.NEXT_PUBLIC_API_ENDPOINT + `tv/${id}?language=en-US`;
    const response = await axios.get(endpoint);
    const movie = response.data;
    return movie;
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      data: error.response?.status_message || "An error occurred",
    };
  }
};
export const calculateColumn = (width: number) => {
  if (width >= 1400) {
    return 6;
  } else if (width >= 1100) {
    return 5;
  } else if (width >= 800) {
    return 4;
  } else if (width >= 500) {
    return 3;
  } else {
    return 2;
  }
};
