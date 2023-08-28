"use client";
import { Hero, ProfileList } from "@/components";
import { useAppSelector } from "@/hooks";

export default function Home() {
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {null === selectedProfileID ? <ProfileList isEdit={false} /> : <Hero />}
    </main>
  );
}
