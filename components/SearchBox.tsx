"use client";
import { SearchBoxProps } from "@/types";
import { useRef, useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBox({ isDesktop }: SearchBoxProps) {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [isFocused, setIsFocused] = useState(!isDesktop);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery("");
      setIsFocused(false);
    }
  }, [search]);

  const handleSearchClick = () => {
    setIsFocused(!isFocused);
  };
  const handleOnOutSideClick = () => {
    if (searchInput.current) {
      if (searchInput.current.value) {
        push(`/search?s=${searchQuery}`);
      } else {
        setIsFocused(false);
      }
    } else {
      push("/");
    }
  };
  const handleSearchChange = () => {
    if (searchInput.current) {
      const inputValue = searchInput.current.value;
      setSearchQuery(inputValue);
      push(`/search?s=${inputValue}`);
    } else {
      push("/");
    }
  };
  const inputDisplay = !isDesktop ? "block" : isFocused ? "block" : "hidden";
  return (
    <div className="flex items-center mr-4">
      {isDesktop && (
        <div className="text-lg mr-2">
          <BsSearch
            onClick={() => {
              handleSearchClick();
            }}
          />
        </div>
      )}
      <input
        type="text"
        name="search"
        className={`${inputDisplay} leading-8 bg-black/40 border-2 border-white/20 pl-2 transition-all`}
        ref={searchInput}
        value={searchQuery}
        placeholder="Search Movie"
        onChange={handleSearchChange}
        onBlur={handleOnOutSideClick}
      />
    </div>
  );
}
