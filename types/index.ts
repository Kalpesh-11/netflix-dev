export interface ProfileProps {
  id: String;
  name: String;
  imgSrc: String;
  isSelected: boolean;
}
export interface ProfilesProps {
  profiles: ProfileProps[];
}

export interface ProfileListProps {
  isEdit: boolean;
}
