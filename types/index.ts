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
  title: string;
  icon: React.ReactNode;
  btnFormat: string;
}
export interface RowProps {
  type: string;
  genre: string;
  heading: string;
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
  isAnimating: boolean;
}
