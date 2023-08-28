import { getHeroMovie } from "@/utils";
import { Button } from "@/components";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
async function Hero() {
  const movie = (await getHeroMovie()).data;

  const backgroundImage = {
    backgroundImage: `linear-gradient(to right,rgba(0,0,0,.3),rgba(0,0,0,.0)), url(${process.env.NEXT_PUBLIC_IMAGE_ENDPOINT}${movie.backdrop_path})`,
  };

  return (
    <div style={backgroundImage} className="hero__container relative">
      <div className="hero__info--wrap w-[36%] p-9 flex flex-col justify-end absolute left-[4%] bottom-[36%] md:bottom-[30%] ">
        <h1 className="herp__info--title text-7xl mb-4 font-extrabold ">
          {movie.original_title}
        </h1>
        <p className="hero__info--desc text-base font-semibold">
          {movie.overview}
        </p>
        <div className="hero__actions-wrap flex gap-4">
          <Button
            title="Play"
            icon={<BsFillPlayFill />}
            btnFormat="white-normal"
          />
          <Button
            title="More Info"
            icon={<AiOutlineInfoCircle />}
            btnFormat="grey-normal"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
