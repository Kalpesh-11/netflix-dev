import { ProfileProps, RowProps } from "@/types";
import axios from "./axios";
export const getHeroMovie = async () => {
  try {
    const response = await axios.get("/movie/popular?language=en-US&page=1");
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
  let endpoint;

  switch (true) {
    case type === "movie" && genre === "trending":
      endpoint = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
      break;
    case type === "tv" && genre === "trending":
      endpoint = "a";
      break;
    case type === "all" && genre === "trending":
      endpoint = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
      break;
    default:
      endpoint = "a";
  }
  return endpoint;
};
export const getData = async (
  type: RowProps["type"],
  genre: RowProps["genre"]
) => {
  try {
    const endpoint = apiRequest(type, genre);
    const response = await axios.get(endpoint);
    const movie = response.data.results;
    // console.log(movie);

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
    return 5;
  } else if (width >= 1100) {
    return 4;
  } else if (width >= 800) {
    return 3;
  } else if (width >= 500) {
    return 2;
  } else {
    return 2;
  }
};
