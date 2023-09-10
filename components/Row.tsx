import React, { useEffect, useState } from "react";
import { MovieCardProps, RowProps } from "@/types";
import { calculateColumn, getData } from "@/utils";
import { MovieCard } from ".";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

function Row({ type, genre }: RowProps) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData(type, genre);
        setMovies(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set isLoading to false in case of an error
      }
    };

    fetchData();
  }, [type, genre]);
  const [isLoading, setIsLoading] = useState(true);
  const [column, setColumn] = useState(5);
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [visualRange, setVisualRange] = useState({ start: 0, end: 5 });
  const [prevVisualRange, setPrevVisualRange] = useState({ start: 0, end: 0 });
  const [nextVisualRange, setNextVisualRange] = useState({ start: 5, end: 10 });
  const [showPrev, setShowPrev] = useState(false);
  const scrollNext = () => {
    const newStart = visualRange.end < 20 ? visualRange.end : 0;
    const newEnd = Math.min(newStart + column, movies.length);
    setShowPrev(true);
    setVisualRange({ start: newStart, end: newEnd });
    const newPrevStart = prevVisualRange.end < 20 ? prevVisualRange.end : 0;
    const newPrevEnd = Math.min(newPrevStart + column, movies.length);
    setPrevVisualRange({ start: newPrevStart, end: newPrevEnd });
    const newNextStart = nextVisualRange.end < 20 ? nextVisualRange.end : 0;
    const newNextEnd = Math.min(newNextStart + column, movies.length);
    setNextVisualRange({ start: newNextStart, end: newNextEnd });
  };
  const scrollPrev = () => {
    const newNextStart = visualRange.start;
    const newNextEnd = visualRange.end;
    setNextVisualRange({ start: newNextStart, end: newNextEnd });
    const newStart = prevVisualRange.start;
    const newEnd = prevVisualRange.end;
    setVisualRange({ start: newStart, end: newEnd });
    const newPrevStart =
      prevVisualRange.start > 1
        ? prevVisualRange.start - column
        : movies.length - column;
    const newPrevEnd = newPrevStart + column;
    setPrevVisualRange({ start: newPrevStart, end: newPrevEnd });
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      const column = calculateColumn(window.innerWidth);
      // setColumn(column);
      console.log(window.innerWidth);
      console.log(column);
    });
  }, []);
  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <>
          <BsFillArrowRightCircleFill onClick={() => scrollNext()} />
          <BsFillArrowRightCircleFill onClick={() => scrollPrev()} />
          <div
            className=" whitespace-nowrap w-screen px-8 mb-20 relative overflow-visible"
            style={{
              transform: `translateX(-${(visualRange.start - 1) * 19}vw)`, // Adjust the translation based on your card width
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {/* <div
              className="inline-block"
              
            > */}
            {showPrev &&
              movies
                ?.slice(prevVisualRange.start, prevVisualRange.end)
                .map((movie) => <MovieCard movie={movie} />)}
            {movies?.slice(visualRange.start, visualRange.end).map((movie) => (
              <MovieCard movie={movie} />
            ))}
            {movies
              ?.slice(nextVisualRange.start, nextVisualRange.end)
              .map((movie) => (
                <MovieCard movie={movie} />
              ))}
          </div>
          {/* </div> */}
        </>
      )}
    </>
  );
}

export default Row;
