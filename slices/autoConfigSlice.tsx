import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

import _ from "lodash";
const initialState = { value: [] as any[] };

const autoConfigSlice = createSlice({
  name: "autoConfig",
  initialState,
  reducers: {
    addAutoConfig: (state, action: PayloadAction<any>) => {
      const arr = [...state.value, action.payload];
      state.value = arr;
    },
    removeAutoConfig: (state, action: PayloadAction<string | string[]>) => {
      if (_.isArray(action.payload)) {
        
        const arr = [...state.value];
        const filteredArr = arr.filter((_: any, index: number) => {
          return index !== action.payload.indexOf(action.payload[index]);
        });

        state.value = filteredArr;
      }
    },
    setAutoConfig: (state, action: PayloadAction<any[]>) => {
      const arr = [...action.payload];
      state.value = arr;
    },
  },
});

export const { addAutoConfig, removeAutoConfig } = autoConfigSlice.actions;

export const selectAutoConfig = (state: RootState) => state.autoConfig.value;

export default autoConfigSlice.reducer;
