"use client";
import { Hero, ProfileList } from "@/components";
import MainPageRows from "@/components/MainPageRows";
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
          <MainPageRows />
        </>
      )}
    </main>
  );
}
