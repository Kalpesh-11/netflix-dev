import { ProfileList } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ProfileList />
      <a
        className="bg-transparent ring-1 ring-secondary-grey text-secondary-grey py-2 px-6 max-w-max mt-10"
        href="/ManageProfile"
      >
        Manage Profiles
      </a>
    </main>
  );
}
