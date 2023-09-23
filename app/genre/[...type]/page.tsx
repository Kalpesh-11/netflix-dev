"use client";
import { Hero, MainPageRows, ProfileList } from "@/components";
import { useAppSelector } from "@/hooks";
import { usePathname } from "next/navigation";

export default function page({ params }: { params: { type: string[] } }) {
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );
  const type = params ? params.type[0] : "movie";
  const genre = params.type[1] ? params.type[1] : "popular";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      {null === selectedProfileID ? (
        <ProfileList isEdit={false} />
      ) : (
        <>
          <Hero type={type} genre={genre} />
          <MainPageRows />
        </>
      )}
    </main>
  );
}
