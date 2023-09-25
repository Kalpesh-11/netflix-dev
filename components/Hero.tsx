import { getHeroMovie } from "@/utils";
import { Button, Header, ResponsiveAppBar } from "@/components";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HeroProps } from "@/types";
async function Hero({ type, genre }: HeroProps) {
  const movie = (await getHeroMovie(type, genre)).data;

  const backgroundImage = {
    backgroundImage: `linear-gradient(to right,rgba(0,0,0,.3),rgba(0,0,0,.0)), url(${process.env.NEXT_PUBLIC_IMAGE_ENDPOINT}${movie.backdrop_path})`,
  };

  return (
    <>
      {/* <Header /> */}
      <ResponsiveAppBar />
      <div style={backgroundImage} className="hero__container relative">
        <div className="hero__info--wrap w-[70%] px-2 py-9 flex flex-col justify-end absolute left-[4%] bottom-[10%] md:bottom-[20%] md:w-[40%] lg:bottom-[36%]">
          <h1 className="herp__info--title text-2xl mb-4 font-extrabold md:text-7xl">
            {"movie" == type ? movie.original_title : movie.original_name}
          </h1>
          <p className="hero__info--desc text-xs hidden font-semibold md:text-base md:block">
            {movie.overview}
          </p>
          <div className="hero__actions-wrap flex gap-4">
            <Button
              title="Play"
              icon={<BsFillPlayFill />}
              btnFormat="white-normal"
              btnClass="netflix-btn-normal"
            />
            <Button
              title="More Info"
              icon={<AiOutlineInfoCircle />}
              btnFormat="grey-normal"
              btnClass="netflix-btn-normal"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
