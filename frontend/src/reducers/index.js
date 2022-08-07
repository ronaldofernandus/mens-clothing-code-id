import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cmsReducer from "./cmsReducer";
import shoppingReducer from "./shoppingReducer";
import miscReducer from "./miscReducer";
import promoReducer from "./promoReducer";
import rajaOngkirReducer from "./rajaOngkirReducer";

export default combineReducers({
  userReducer,
  cmsReducer,
  shoppingReducer,
  miscReducer,
  promoReducer,
  rajaOngkirReducer,
});
