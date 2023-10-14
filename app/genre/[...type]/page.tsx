"use client";
import { Footer, Hero, ProfileList, Row } from "@/components";
import { useAppSelector } from "@/hooks";
import { GenreProps, ProfilesProps } from "@/types";
import { getProfile, isGenreExist } from "@/utils";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "./loading";
import { useSearchParams } from "next/navigation";
export default function TypePage({ params }: { params: { type: string[] } }) {
  const [isLoading, setLoading] = useState(true);
  const [userMovies, setUserMovies] = useState<[string, string][]>([]);
  const type = params ? params.type[0] : "movie";
  const searchParams = useSearchParams();
  const genre = searchParams.get("bc");
  const subHeading = type == "movie" ? "Movies" : "Tv Shows";
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );
  const { profiles }: ProfilesProps = useAppSelector(
    (state) => state.profiles.profileList
  );
  const [isExist, setIsExist] = useState<GenreProps | null>(null);
  const profile = getProfile(selectedProfileID, profiles);
  useEffect(() => {
    setLoading(true);
    const checkGenre = async () => {
      const isExistCheck = await isGenreExist(type, genre);
      setIsExist(isExistCheck);
    };
    checkGenre();
    const newUserMovies = type == "movie" ? profile?.movie : profile?.tv;
    if (undefined !== newUserMovies) {
      const movieArray = Object.entries(newUserMovies);
      setUserMovies(movieArray);
    }

    setLoading(false);
  }, [profile, genre]);
  if ("movie" !== type && "tv" !== type) {
    notFound();
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
        {null === selectedProfileID || null === profile ? (
          <ProfileList isEdit={false} />
        ) : isLoading ? (
          <Loading />
        ) : isExist ? (
          <>
            <Hero type={type} genre={genre} />
            <div className="netflix_rows">
              {genre && (
                <Row
                  type={type}
                  genre={genre}
                  heading={`${isExist.name} ${subHeading}`}
                />
              )}
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
            </div>
          </>
        ) : (
          <p>Genre not found.</p>
        )}
      </main>
    </>
  );
}
