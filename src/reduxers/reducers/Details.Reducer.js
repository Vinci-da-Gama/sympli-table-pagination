import {
  SET_DETAILS,
  SET_CURRENT_PAGE_URL,
  GET_FILMS_FAIL,
  RESET_DETAILS_TO_DEFAULT,
} from "../../types";

const initDetailsState = {
  details: {},
  currentPageUrl: "",
  success: false,
  errorMessage: "",
};

export default (state = initDetailsState, { type, payload }) => {
  switch (type) {
    case SET_DETAILS:
      return {
        ...state,
        details: payload,
        success: true,
        errorMessage: "",
      };
    case GET_FILMS_FAIL:
      return {
        ...state,
        details: {},
        success: false,
        errorMessage: payload.errorMessage,
      };
    case SET_CURRENT_PAGE_URL:
      return {
        ...state,
        currentPageUrl: payload,
      };
    case RESET_DETAILS_TO_DEFAULT:
      return initDetailsState;
    default:
      return state;
  }
};
