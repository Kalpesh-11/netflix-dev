export const profiles = [
  {
    id: "tony",
    name: "Tony",
    imgSrc: "https://placehold.co/150",
    isSelected: false,
    // movie:['878','12','35','53','53']
    movie: {
      "Science Fiction": "878",
      Adventure: "12",
      Comedy: "35",
      Thriller: "53",
      Action: "28",
    },
    tv: {
      "Science Fiction": "878",
      Adventure: "12",
      Comedy: "35",
      Thriller: "53",
      Action: "28",
    },
  },
  {
    id: "joey",
    name: "Joey",
    imgSrc: "https://placehold.co/150",
    isSelected: false,
    movie: {
      Comedy: "35",
      Romance: "10749",
      Family: "10751",
      Animation: "16",
    },
  },
  {
    id: "ww",
    name: "Walter White",
    imgSrc: "https://placehold.co/150",
    isSelected: false,
    movie: {
      Crime: "80",
      "Science Fiction": "878",
      History: "36",
      Mystery: "9648",
      Documentary: "99",
    },
  },
  {
    id: "natasha",
    name: "natasha",
    imgSrc: "https://placehold.co/150",
    isSelected: false,
  },
  {
    id: "thor",
    name: "Thor",
    imgSrc: "https://placehold.co/150",
    isSelected: false,
    movie: {
      "Science Fiction": "878",
      Adventure: "12",
      Comedy: "35",
      Thriller: "53",
      Action: "28",
    },
  },
];
export const menus = {
  Home: "/",
  "Tv Shows": "/genre/tv",
  Movies: "/genre/movie",
};
export const SettingMenus = {
  Account: "/",
  "Help Center": "#",
  "Sign out from Netflix": "#",
};
export interface Profile {
  id: String;
}
