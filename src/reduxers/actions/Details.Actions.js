import { SET_DETAILS, KEEP_CURRENT_PAGE_URL } from "../../types";
import { Errors } from "../../constant/Errors";
import { fetchGet } from "../../helpers";

export const setDetails = (payload) => ({
  type: SET_DETAILS,
  payload,
});
