import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";

const rootReduser = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export default rootReduser;
