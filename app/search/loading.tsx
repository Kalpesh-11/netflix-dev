import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-start gap-4 items-center px-[4%]">
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ bgcolor: "grey.900" }}
        width="20%"
        height="20%"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ bgcolor: "grey.900" }}
        width="20%"
        height="20%"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ bgcolor: "grey.900" }}
        width="20%"
        height="20%"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ bgcolor: "grey.900" }}
        width="20%"
        height="20%"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ bgcolor: "grey.900" }}
        width="20%"
        height="20%"
      />
    </div>
  );
}
