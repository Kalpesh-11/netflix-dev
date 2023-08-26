"use client";

import Image from "next/image";
// import { profiles } from "@/constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setProfile } from "../slices/profilesSlice";
import { ProfilesProps, ProfileProps } from "@/types";

function BrowseProfile() {
  const { profiles }: ProfilesProps = useAppSelector(
    (state) => state.profiles.profileList
  );
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );
  console.log(profiles);

  const dispatch = useAppDispatch();
  return (
    <div className="profiles-container flex flex-col items-center ">
      <h1 className="text-5xl mb-6 text-tertiary-white profiles__title text-center">
        Who's Watching:
      </h1>
      <ul className="profile__lists flex gap-6 text-center">
        {profiles.map((profile, i) => {
          return (
            <li key={i} onClick={() => dispatch(setProfile(profile.id))}>
              <div className="profile__list-wrap mb-6">
                <div className="profile__list--image">
                  <Image
                    src={profile.imgSrc}
                    alt={profile.name}
                    width={150}
                    height={150}
                    className="object-contain rounded-sm"
                  />
                </div>
                <div className="profile__list--title text-secondary-grey mt-3 capitalize font-medium">
                  {profile.name}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <button className="bg-transparent ring-1 ring-secondary-grey text-secondary-grey py-2 px-6 max-w-max mt-10 ">
        Manage Profiles
      </button>
      <span className="bg-transparent ring-1 ring-secondary-grey text-secondary-grey py-2 px-6 max-w-max mt-10 ">
        {selectedProfileID}
      </span>
    </div>
  );
}

export default BrowseProfile;
