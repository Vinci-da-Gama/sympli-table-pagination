import { SET_DETAILS, KEEP_CURRENT_PAGE_URL } from "../../types";

const initDetailsState = {
  details: {},
};

export default (state = initDetailsState, { type, payload }) => {
  switch (type) {
    case SET_DETAILS:
      return {
        ...state,
        details: payload,
      };
    default:
      return state;
  }
};
