import { ProfileProps } from "@/types";
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
