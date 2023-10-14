import { SearchBoxProps } from "@/types";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBox({ isDesktop }: SearchBoxProps) {
  const [isFocused, setIsFocused] = useState(!isDesktop);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef<HTMLInputElement | null>(null);
  const handleSearchClick = () => {
    setIsFocused(!isFocused);
    console.log(isFocused);
  };
  const handleOnOutSideClick = () => {
    if (searchInput.current && !searchInput.current.value) {
      setIsFocused(false);
      console.log("close");
    }
  };
  const handleSearchChange = () => {
    if (searchInput.current) {
      setSearchQuery(searchInput.current.value);
    }
  };
  const inputDisplay = !isDesktop ? "block" : isFocused ? "block" : "hidden";
  return (
    <>
      {isDesktop && (
        <BsSearch
          onClick={() => {
            handleSearchClick();
          }}
        />
      )}
      <input
        type="text"
        name="search"
        className={`${inputDisplay} text-black`}
        ref={searchInput}
        value={searchQuery}
        onChange={handleSearchChange}
        onBlur={handleOnOutSideClick}
      />
    </>
  );
}
