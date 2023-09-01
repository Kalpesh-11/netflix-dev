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
}
export interface MovieProps {
  type: string;
  genre: string;
}
