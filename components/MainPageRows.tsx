import { Row } from ".";

function MainPageRows() {
  return (
    <div className="netflix_rows absolute top-[30vw] md:top-[35vw] overflow-x-hidden w-full pt-28 [&>*:not(:first-child)]:mt-9">
      <Row type="all" genre="trending" heading={"Trending Movies & TV Shows"} />
      <Row type="movie" genre="trending" heading={"Trending Movies"} />
      <Row type="tv" genre="trending" heading={"Trending TV Shows"} />
    </div>
  );
}

export default MainPageRows;
