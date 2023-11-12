// External Dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Internal Dependencies
import type { RootState } from "@/store";

// Define a type of slice state
interface MenuState {
  value: string;
}

// Define the initial state using that type
const initialState: MenuState = {
  value: "",
};

export const menuSlice = createSlice({
  name: "menu",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setMenu } = menuSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMenu = (state: RootState) => state.menu.value;

export default menuSlice.reducer;
