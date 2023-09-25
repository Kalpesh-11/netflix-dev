import React, { useEffect, useState } from "react";
import { MovieCardProps, RowProps } from "@/types";
import { calculateColumn, getData } from "@/utils";
import { MovieCard } from ".";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function Row({ type, genre, heading }: RowProps) {
  const [column, setColumn] = useState(calculateColumn(window.innerWidth));
  useEffect(() => {
    const columns = calculateColumn(window.innerWidth);
    setColumn(columns);
    window.addEventListener("resize", () => {
      const columns = calculateColumn(window.innerWidth);
      setColumn(columns);
    });
  }, [window]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollValue, setScrollValue] = useState(0);
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [visualRange, setVisualRange] = useState({ start: 0, end: column });
  const [prevVisualRange, setPrevVisualRange] = useState({ start: 0, end: 0 });
  const [nextVisualRange, setNextVisualRange] = useState({
    start: column,
    end: column * 2,
  });
  const [showPrev, setShowPrev] = useState(false);
  const [isAnimating, setAnimating] = useState(false);

  const columnWidth = Math.trunc(100 / column);
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

  const scrollNext = () => {
    const newStart = visualRange.end < 20 ? visualRange.end : 0;
    const newEnd = Math.min(newStart + column, movies.length);
    const newPrevStart = prevVisualRange.end < 20 ? prevVisualRange.end : 0;
    const newPrevEnd = Math.min(newPrevStart + column, movies.length);
    const newNextStart = nextVisualRange.end < 20 ? nextVisualRange.end : 0;
    const newNextEnd = Math.min(newNextStart + column, movies.length);
    setTimeout(() => {
      setShowPrev(true);
      setVisualRange({ start: newStart, end: newEnd });
      setPrevVisualRange({ start: newPrevStart, end: newPrevEnd });
      setNextVisualRange({ start: newNextStart, end: newNextEnd });
      setScrollValue(-column * columnWidth);
      setAnimating(false);
    }, 800);
    const newScrollValue =
      !showPrev && 0 == visualRange.start
        ? -column * columnWidth
        : -column * 2 * columnWidth;
    setScrollValue(newScrollValue);
    setAnimating(true);
  };
  const scrollPrev = () => {
    const newNextStart = visualRange.start;
    const newNextEnd = visualRange.end;
    const newStart = prevVisualRange.start;
    const newEnd = prevVisualRange.end;
    const newPrevStart =
      prevVisualRange.start > 1
        ? prevVisualRange.start - column
        : movies.length - column;
    const newPrevEnd = newPrevStart + column;
    setScrollValue(0);
    setAnimating(true);
    setTimeout(() => {
      setNextVisualRange({ start: newNextStart, end: newNextEnd });
      setVisualRange({ start: newStart, end: newEnd });
      setPrevVisualRange({ start: newPrevStart, end: newPrevEnd });
      setScrollValue(-column * columnWidth);
      setAnimating(false);
    }, 800);
  };
  return (
    <>
      {isLoading
        ? "loading"
        : movies.length !== 0 && (
            <div className=" group px-[4%] ">
              <div>
                <h3 className="text-tertiary-white-heading font-semibold text-lg mb-2">
                  {heading}
                </h3>
              </div>
              <div className="relative">
                {showPrev && (
                  <IoIosArrowBack
                    onClick={() => scrollPrev()}
                    className="netflix__previous netflix-action_btn hidden group-hover:block"
                  />
                )}
                <div
                  className={`whitespace-nowrap relative w-full overflow-visible ${
                    isAnimating && "animating"
                  }`}
                  style={{
                    // transform: `translate(${scrollValue}%, 0px)`,
                    marginLeft: `${scrollValue}%`,
                  }}
                >
                  {showPrev &&
                    movies
                      ?.slice(prevVisualRange.start, prevVisualRange.end)
                      .map((movie, index) => (
                        <MovieCard
                          key={index}
                          movie={movie}
                          column={column}
                          isAccessible={false}
                          mediaType={type}
                        />
                      ))}
                  {movies
                    ?.slice(visualRange.start, visualRange.end)
                    .map((movie, index) => (
                      <MovieCard
                        key={index}
                        movie={movie}
                        column={column}
                        isAccessible={true}
                        mediaType={type}
                      />
                    ))}
                  {movies
                    ?.slice(nextVisualRange.start, nextVisualRange.end)
                    .map((movie, index) => (
                      <MovieCard
                        key={index}
                        movie={movie}
                        column={column}
                        isAccessible={false}
                        mediaType={type}
                      />
                    ))}
                </div>
                <IoIosArrowForward
                  className="netflix__next netflix-action_btn hidden group-hover:block"
                  value={{ color: "blue", size: "50px" }}
                  onClick={() => scrollNext()}
                />
              </div>
            </div>
          )}
    </>
  );
}

export default Row;
