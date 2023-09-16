import { MovieCardProps, MovieProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grow } from "@mui/material";

function MovieCard({
  movie,
  isAnimating,
}: {
  movie: MovieCardProps;
  isAnimating: boolean;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [isExpandCard, setIsExpandCard] = useState(false);
  const expandCard = () => {
    setIsExpandCard(true);
  };

  const collapseCard = () => {
    setIsExpandCard(false);
  };
  return (
    <div
      className="netflix-card relative inline-block w-[18vw]"
      onMouseEnter={() => expandCard()}
      onMouseLeave={() => collapseCard()}
    >
      <Card
        style={{
          minWidth: 200,
          maxWidth: "18vw",
          padding: " 0 0.2vw",
          borderRadius: 10,
          background: "transparent",
          // maxHeight: 100,
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="50"
          image={process.env.NEXT_PUBLIC_IMAGE_ENDPOINT + movie.backdrop_path}
        />
      </Card>

      {isExpandCard && (
        <Grow
          in={isExpandCard}
          style={{ transformOrigin: "0 0 0" }}
          {...(isExpandCard ? { timeout: 700 } : {})}
        >
          <Card
            style={{
              position: "absolute",
              maxWidth: "20vw",
              top: "50%",
              left: "50%",
              minWidth: 340,
              maxHeight: 300,
              transform: "translate(-50%, -50%)",
              zIndex: 999,
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="50"
              image={
                process.env.NEXT_PUBLIC_IMAGE_ENDPOINT + movie.backdrop_path
              }
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard11
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Grow>
      )}
    </div>
  );
}

export default MovieCard;
