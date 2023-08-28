"use client";
import { useAppSelector } from "@/hooks";
import { ProfilesProps } from "@/types";
import { getProfile } from "@/utils";

export default function Loading() {
  const selectedProfileId = useAppSelector<string | undefined | null>(
    (state) => state.profiles.selectedProfileID
  )?.toString();
  const { profiles }: ProfilesProps = useAppSelector(
    (state) => state.profiles.profileList
  );
  const profile = getProfile(selectedProfileId, profiles);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {selectedProfileId}
    </div>
  );
}
