"use client";
import { Hero, ProfileList, Row } from "@/components";
import { useAppSelector } from "@/hooks";
import { ProfilesProps } from "@/types";
import { getProfile } from "@/utils";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "./loading";
export default function page({ params }: { params: { type: string[] } }) {
  const [isLoading, setLoading] = useState(true);
  const [userMovies, setUserMovies] = useState<[string, string][]>([]);
  const type = params ? params.type[0] : "movie";
  const genre = params.type[1] ? params.type[1] : "popular";
  const subHeading = type == "movie" ? "Movies" : "Tv Shows";
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );
  const { profiles }: ProfilesProps = useAppSelector(
    (state) => state.profiles.profileList
  );
  const profile = getProfile(selectedProfileID, profiles);
  useEffect(() => {
    setLoading(true);
    const newUserMovies = type == "movie" ? profile?.movie : profile?.tv;
    if (undefined !== newUserMovies) {
      const movieArray = Object.entries(newUserMovies);
      setUserMovies(movieArray);
    }
    setLoading(false);
  }, [profile]);
  if ("movie" !== type && "tv" !== type) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      {null === selectedProfileID || null === profile ? (
        <ProfileList isEdit={false} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <>
          <Hero type={type} genre={genre} />
          <div className="netflix_rows">
            <Row type={type} genre="popular" heading={"Popular on Netflix"} />
            {userMovies &&
              userMovies
                .slice(0, 2)
                .map(([genre, genreID]) => (
                  <Row
                    type={type}
                    key={genreID}
                    genre={genreID}
                    heading={`${genre} ${subHeading}`}
                  />
                ))}
            <Row
              type={type}
              genre="trending"
              heading={`Trending ${subHeading}`}
            />
            {userMovies &&
              userMovies
                .slice(2)
                .map(([genre, genreID]) => (
                  <Row
                    type={type}
                    key={genreID}
                    genre={genreID}
                    heading={`${genre} ${subHeading}`}
                  />
                ))}
            {/*
             */}
          </div>
        </>
      )}
    </main>
  );
}
