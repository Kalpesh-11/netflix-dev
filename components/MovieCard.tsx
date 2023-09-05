import { MovieProps } from "@/types";
import Image from "next/image";
import React from "react";

function MovieCard({ movie }: MovieProps) {
  console.log("movie");
  return (
    <div>
      <Image
        src={process.env.NEXT_PUBLIC_IMAGE_ENDPOINT + movie.backdrop_path}
        height={250}
        width={250}
      />
      <p>{"movie" === movie.media_type ? movie.title : movie.name}</p>
    </div>
  );
}

export default MovieCard;
