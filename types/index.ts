export interface ProfileProps {
  id: string;
  name: string;
  imgSrc: string;
  isSelected: boolean;
}
export interface ProfilesProps {
  profiles: ProfileProps[];
}

export interface ProfileListProps {
  isEdit: boolean;
}
export interface ButtonProps {
  title?: string;
  icon: React.ReactNode;
  btnFormat: string;
  btnClass: string;
}
export interface RowProps {
  type: string;
  genre: string;
  heading: string;
}
export interface HeroProps {
  type: string;
  genre: string;
}
export interface MovieProps {
  type: string;
  genre: string;
}
export interface MovieCardProps {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: number;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}
export interface MovieDetailsProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string[];
  budget: number;
  genres: { name: string }[];
  genre_ids?: string[];
  media_type: string;
  homepage: string;
  id: number;
  in_production: true;
  languages: string;
  last_air_date: number;
  last_episode_to_air: string[];
  name: string;
  next_episode_to_air: null;
  networks: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: string[];
  production_countries: string[];
  spoken_languages: string[];
  status: string[];
  tagline: string[];
  type: string[];
  vote_average: number;
  vote_count: number;
  runtime?: number;
  number_of_episodes?: number;
  number_of_seasons?: number;
}
