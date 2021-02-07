import { SET_PEOPLE, SET_PEOPLE_FAIL } from "../../types";

const initPeopleState = {
  people: [],
  next: "",
  previous: "",
  success: false,
  errorMessage: "",
};

const PeopleReducer = (state = initPeopleState, { type, payload }) => {
  switch (type) {
    case SET_PEOPLE:
      return {
        ...state,
        people: payload.results,
        next: payload.next,
        previous: payload.previous,
        success: true,
        errorMessage: "",
      };
    case SET_PEOPLE_FAIL:
      return {
        ...state,
        success: false,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};

export default PeopleReducer;
