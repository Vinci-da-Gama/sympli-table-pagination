import { combineReducers } from "redux";
import PeopleReducer from "./reducers/People.Reducer";
import DetailsReducer from "./reducers/Details.Reducer";

const RootReducer = combineReducers({
  PeopleReducer,
  DetailsReducer,
});

export default RootReducer;
