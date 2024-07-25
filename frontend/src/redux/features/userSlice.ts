import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

interface UserState {
  user: User | null;
  showAuthModal: boolean;
  showCart: boolean;
  showOrderSuccess: {
    status: boolean;
    details?: any;
  };
  itemSearch: string;
}

const initialState: UserState = {
  user: null,
  showAuthModal: false,
  showCart: false,
  showOrderSuccess: {
    status: false,
    details: undefined,
  },
  itemSearch: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = new User(action.payload);
    },
    setAuthModal: (state, action: PayloadAction<boolean>) => {
      state.showAuthModal = action.payload;
    },
    setShowCart: (state, action: PayloadAction<boolean>) => {
      state.showCart = action.payload;
    },
    setShowOrderSuccess: (state, action: PayloadAction<any>) => {
      state.showOrderSuccess = action.payload;
    },
    setItemSearch: (state, action: PayloadAction<string>) => {
      state.itemSearch = action.payload;
    },
  },
});

export const {
  setUser,
  setAuthModal,
  setShowCart,
  setItemSearch,
  setShowOrderSuccess,
} = userSlice.actions;
export default userSlice.reducer;
