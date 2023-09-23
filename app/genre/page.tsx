"use client";
import { usePathname } from "next/navigation";

export default function page() {
  const router = usePathname();
  return <div className="bg-white">asdads</div>;
}
