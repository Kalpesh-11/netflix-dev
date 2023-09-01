import { useEffect, useState } from "react";
import { RowProps } from "@/types";
import { getData } from "@/utils";
import { MovieCard } from ".";

function Row({ type, genre }: RowProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState(null);

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
  console.log(movies);

  return (
    <div>
      {isLoading ? (
        "loading"
      ) : (
        <div>
          {movies && (
            <div>
              {movies.map((movie) => {
                return <MovieCard movie={movie} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Row;
