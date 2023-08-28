"use client";

import Image from "next/image";
// import { profiles } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setProfile } from "@/slices/profilesSlice";
import { ProfilesProps, ProfileListProps } from "@/types";
import { GrEdit } from "react-icons/gr";
function ProfileList({ isEdit }: ProfileListProps) {
  const { profiles }: ProfilesProps = useAppSelector(
    (state) => state.profiles.profileList
  );
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );
  const dispatch = useAppDispatch();
  return (
    <div className="profiles-container flex flex-col items-center py-[12%] mx-3 ">
      <h1 className="profiles__title text-3xl mb-6 text-tertiary-white  text-center md:text-5xl">
        {true != isEdit ? "Who's Watching:" : "Manage Profiles:"}
      </h1>
      <ul className="w-full profile__lists flex justify-center gap-6 text-center flex-wrap">
        {profiles.map((profile, i) => {
          return (
            <li
              key={i}
              onClick={() => dispatch(setProfile(profile.id))}
              className="w-[10vw] min-w-[130px] min-h-[84px]"
            >
              <div className="profile__list-wrap mb-6 group w-full ">
                <div className="profile__list--image group-hover:ring-1 group-hover:ring-secondary-grey relative">
                  <Image
                    src={profile.imgSrc}
                    alt={profile.name}
                    width={150}
                    height={150}
                    className="object-contain rounded-sm"
                  />
                  {true == isEdit && (
                    <div className="absolute profile__edit top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-secondary-grey/20 w-full h-full flex justify-center items-center">
                      <GrEdit />
                    </div>
                  )}
                </div>
                <div className="profile__list--title text-secondary-grey mt-3 capitalize font-regular group-hover:text-tertiary-white">
                  {profile.name}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {true !== isEdit ? (
        <a
          className="bg-transparent ring-1 ring-secondary-grey text-secondary-grey py-2 px-6 max-w-max mt-10"
          href="/ManageProfile"
        >
          Manage Profiles
        </a>
      ) : (
        <a
          className="bg-transparent ring-1 ring-secondary-grey text-secondary-grey py-2 px-6 max-w-max mt-10"
          href="/"
        >
          Done
        </a>
      )}
    </div>
  );
}

export default ProfileList;
