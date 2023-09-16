import React, { useEffect, useState } from "react";
import { MovieCardProps, RowProps } from "@/types";
import { calculateColumn, getData } from "@/utils";
import { MovieCard } from ".";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

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
  const [scrollValue, setScrollValue] = useState(0);
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [visualRange, setVisualRange] = useState({ start: 0, end: 5 });
  const [prevVisualRange, setPrevVisualRange] = useState({ start: 0, end: 0 });
  const [nextVisualRange, setNextVisualRange] = useState({ start: 5, end: 10 });
  const [showPrev, setShowPrev] = useState(false);
  const [isAnimating, setAnimating] = useState(false);
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
    const newScrollValue = -column * 2 * 18;
    setScrollValue(newScrollValue);
    setAnimating(true);
    setTimeout(() => {
      setScrollValue(-column * 18);
      setAnimating(false);
    }, 800);
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
    const newScrollValue =
      showPrev && 0 == newNextStart ? column * 18 : column * 2 * 18;
    setScrollValue(newScrollValue);
    setAnimating(true);
    setTimeout(() => {
      setScrollValue(-column * 18);
      setAnimating(false);
    }, 800);
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
        <div className="relative">
          {showPrev && (
            <IoIosArrowBack
              onClick={() => scrollPrev()}
              className="netflix__previous netflix-action_btn"
            />
          )}
          <div
            className={`whitespace-nowrap w-screen px-12 mb-20 relative overflow-visible ${
              isAnimating && "animating"
            }`}
            style={{
              transform: `translate3d(${scrollValue}vw, 0, 0 )`,
            }}
          >
            {showPrev &&
              movies
                ?.slice(prevVisualRange.start, prevVisualRange.end)
                .map((movie) => (
                  <MovieCard movie={movie} isAnimating={isAnimating} />
                ))}
            {movies?.slice(visualRange.start, visualRange.end).map((movie) => (
              <MovieCard movie={movie} isAnimating={isAnimating} />
            ))}
            {movies
              ?.slice(nextVisualRange.start, nextVisualRange.end)
              .map((movie) => (
                <MovieCard movie={movie} isAnimating={isAnimating} />
              ))}
          </div>
          <IoIosArrowForward
            className="netflix__next netflix-action_btn"
            value={{ color: "blue", size: "50px" }}
            onClick={() => scrollNext()}
          />
          {/* </div> */}
        </div>
      )}
    </>
  );
}

export default Row;
