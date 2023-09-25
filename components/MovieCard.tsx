import { MovieCardProps, MovieDetailsProps } from "@/types";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { BsFillPlayFill } from "react-icons/bs";
import { SmallButton } from ".";
import { getMovie } from "@/utils";

const movieDetailsCache: Record<number, MovieDetailsProps> = {};

function MovieCard({
  movie,
  column,
  isAccessible,
  mediaType,
}: {
  movie: MovieCardProps;
  column: number;
  isAccessible: boolean;
  mediaType: "movie" | "tv" | "all";
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isExpandCard, setIsExpandCard] = useState(false);
  const match = Math.floor(movie.vote_average * 10);
  const expandCard = () => {
    setIsExpandCard(true);
  };

  const collapseCard = () => {
    setIsExpandCard(false);
  };
  const columnWidth = (100 / column).toFixed(2);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>();
  const movieType =
    undefined !== movie.media_type ? movie.media_type : mediaType;

  useEffect(() => {
    const fetchData = async () => {
      if (movie.id in movieDetailsCache) {
        setMovieDetails(movieDetailsCache[movie.id]);
        return;
      }

      try {
        const fetchedData = await getMovie(movieType, movie.id);
        movieDetailsCache[movie.id] = fetchedData;
        setMovieDetails(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [movie]);
  let minutes = 30;
  let hours = 1;
  let episodes_label = "";
  if (movieDetails) {
    if ("movie" == movieType) {
      const runtime = movieDetails.runtime ? movieDetails.runtime : 90;
      minutes = runtime % 60;
      hours = Math.floor(runtime / 60);
    } else {
      const isMultipleSeasons =
        movieDetails.number_of_seasons && movieDetails.number_of_seasons > 1
          ? true
          : false;
      episodes_label = isMultipleSeasons
        ? movieDetails.number_of_seasons + " Seasons"
        : movieDetails.number_of_episodes + " Episodes" ?? 8 + " Episodes";
    }
  }

  return (
    <div
      className={`netflix-card relative inline-block`}
      style={{
        width: `${columnWidth}%`,
        pointerEvents: isAccessible ? "unset" : "none",
      }}
      onMouseEnter={() => expandCard()}
      onMouseLeave={() => collapseCard()}
    >
      <div className="netflix-card__image-wrap">
        <Card>
          <CardMedia
            component="img"
            alt="green iguana"
            height="50"
            image={process.env.NEXT_PUBLIC_IMAGE_ENDPOINT + movie.backdrop_path}
          />
        </Card>
      </div>
      <div
        className="netflix-card__expanded absolute top-[50%] left-[50%] z-[99] bg-transparent p-4 inline-block"
        style={{
          transform: isExpandCard
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0)",
          maxWidth: `${columnWidth}vw`,
          opacity: isExpandCard ? 1 : 0,
          minWidth: parseInt(columnWidth) < 35 ? 364 : 200,
          zIndex: 999,
          willChange: "transform",
          transition: "all 0.54s cubic-bezier(0.5, 0, 0.1, 1) 0s",
        }}
      >
        <Card>
          <CardMedia
            component="img"
            alt="green iguana"
            height="50"
            image={process.env.NEXT_PUBLIC_IMAGE_ENDPOINT + movie.backdrop_path}
          />

          <CardContent className="bg-primary-black-popup relative">
            <SmallButton
              icon={<BsFillPlayFill />}
              btnFormat="bg-white"
              btnClass="netflix-btn-small white-btn"
            />

            <div className="flex justify-start gap-2 items-center text-[2vw] font-semibold mt-4 md:text-base md:gap-4 ">
              <span className="text-netflix-green  ">{match}% Match</span>
              <span className="text-secondary-grey border px-2">
                U/A {movie.adult ? 18 : 16} +
              </span>
              <span className="text-secondary-grey">
                {"movie" === movieType
                  ? `${hours}h ${minutes}m`
                  : episodes_label}
              </span>
            </div>
            <div className="text-tertiary-white flex gap-1 mt-4 text-[2vw] md:text-base md:gap-2">
              {movieDetails?.genres.slice(0, 3).map((genre, index) => (
                <>
                  {index > 0 && index < 3 && (
                    <span
                      key={`separator-${index}`}
                      className="netflix-separator"
                    ></span>
                  )}
                  <span key={`genre-${index}`}>{genre.name}</span>
                </>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MovieCard;
