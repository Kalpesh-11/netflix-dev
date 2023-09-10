import { Row } from ".";

function MainPageRows() {
  return (
    <div className="absolute top-[50vw] overflow-x-hidden">
      <Row type="all" genre="trending" heading={"Trending Movies & TV Shows"} />
    </div>
  );
}

export default MainPageRows;
