"use client";
import { Footer, Hero, ProfileList, Row } from "@/components";
import { useAppSelector } from "@/hooks";

export default function Home() {
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      {null === selectedProfileID ? (
        <ProfileList isEdit={false} />
      ) : (
        <>
          <Hero type="movie" genre="popular" />
          <div className="netflix_rows">
            <Row
              key={"all-trending"}
              type="all"
              genre="trending"
              heading={"Trending Movies & TV Shows"}
            />
            <Row
              type="movie"
              key={"movie-trending"}
              genre="trending"
              heading={"Trending Movies"}
            />
            <Row
              type="tv"
              key={"tv-trending"}
              genre="trending"
              heading={"Trending TV Shows"}
            />
          </div>
          <Footer />
        </>
      )}
    </main>
  );
}
