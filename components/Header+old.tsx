import { useState } from "react";
import Button from "@mui/material/Button";
import { useAppSelector } from "@/hooks";
import { ProfilesProps } from "@/types";
import { getProfile } from "@/utils";
import { Sidebar } from ".";
export default function Header() {
  const [state, setState] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );
  const { profiles }: ProfilesProps = useAppSelector(
    (state) => state.profiles.profileList
  );
  const profile = getProfile(selectedProfileID, profiles);
  return (
    <div className="fixed top-10 left-10 text-white z-30">
      <Button onClick={toggleDrawer(true)}>left</Button>
    </div>
  );
}
