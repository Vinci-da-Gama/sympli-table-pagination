import { combineReducers } from "redux";
import PeopleReducer from "./reducers/People.Reducer";

const RootReducer = combineReducers({
  PeopleReducer,
});

export default RootReducer;
