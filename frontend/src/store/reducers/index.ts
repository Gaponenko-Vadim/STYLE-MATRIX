import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const rootReduser = combineReducers({
  user: userReducer,
});

export default rootReduser;
