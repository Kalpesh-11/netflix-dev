import { ProfileList } from "@/components";
import Image from "next/image";
import { ProfileListProps } from "@/types";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ProfileList isEdit={true} />
    </main>
  );
}
