"use client";
import { Footer, MovieCard, ProfileList, Row } from "@/components";
import { useState, useEffect } from "react";
import Loading from "./loading";
import { useAppSelector } from "@/hooks";
import { MovieCardProps, ProfilesProps } from "@/types";
import { calculateColumn, getMovieSearch, getProfile } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Search() {
  const [isLoading, setLoading] = useState(true);
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );
  const { profiles }: ProfilesProps = useAppSelector(
    (state) => state.profiles.profileList
  );
  const profile = getProfile(selectedProfileID, profiles);
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [searchResults, setSearchResults] = useState<MovieCardProps[] | null>(
    null
  );
  const [column, setColumn] = useState(5);
  const { push } = useRouter();
  useEffect(() => {
    const handleResize = () => {
      const columns = calculateColumn(window.innerWidth);
      setColumn(columns);
    };

    if (typeof window !== "undefined") {
      setColumn(calculateColumn(window.innerWidth));
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  useEffect(() => {
    setLoading(true);
    const getMovies = async (search: string) => {
      const data = await getMovieSearch(search);
      if (!data) {
        return setSearchResults(null);
      }
      const results: MovieCardProps[] = data.results.filter(
        (movie: MovieCardProps) => {
          return movie.media_type !== "person" && movie.backdrop_path !== null;
        }
      );
      setSearchResults(results);
    };
    if (search) {
      getMovies(search);
      setLoading(false);
    } else {
      push("/");
    }
    setLoading(false);
  }, [search]);
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
        {null === selectedProfileID || null === profile ? (
          <ProfileList isEdit={false} />
        ) : isLoading ? (
          <Loading />
        ) : Array.isArray(searchResults) && searchResults.length > 0 ? (
          <div className="flex flex-wrap px-[4%] mt-48 w-full gap-y-10 mb-16">
            {searchResults.map((movie, index) => {
              return (
                <MovieCard
                  key={`search-${index}`}
                  movie={movie}
                  column={column}
                  isAccessible={true}
                  mediaType={movie.media_type}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap items-center px-[4%] mt-48 w-full gap-y-10 mb-40 text-slate-200">
            <p className="w-full text-center">No Title Found</p>
          </div>
        )}
        <Footer />
      </main>
    </>
  );
}
