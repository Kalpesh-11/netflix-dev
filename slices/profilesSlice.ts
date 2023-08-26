import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profiles } from "@/constants";
import { ProfilesProps } from "@/types";

const profileList: ProfilesProps = {
  profiles,
};
const selectedProfileID = null;
export const profilesSlice = createSlice({
  name: "profiles",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {
    profileList,
    selectedProfileID,
  },
  reducers: {
    setProfile: (state, action) => {
      const { type, data } = action.payload;
      state.selectedProfileID = action.payload;
    },
  },
});

export const { setProfile } = profilesSlice.actions;
export default profilesSlice.reducer;
