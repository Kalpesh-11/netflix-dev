import { useEffect, useState } from "react";
import { RowPros } from "@/types";
import { getData } from "@/utils";

function Row({ type, genre }: RowPros) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const fetchedData = getData(type, genre);
      setData(fetchedData);
      setIsLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, [type, genre]);

  return <div>{isLoading ? "loading" : <div>{data && <div></div>}</div>}</div>;
}

export default Row;
