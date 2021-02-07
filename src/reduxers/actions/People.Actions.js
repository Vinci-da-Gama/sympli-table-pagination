import {
  SET_PEOPLE,
  SET_PEOPLE_FAIL,
  RESET_PEOPLE_TO_DEFAULT,
} from "../../types";
import { Errors } from "../../constant";
import { fetchGet } from "../../helpers";

export const setPeople = (payload) => ({
  type: SET_PEOPLE,
  payload,
});

const setPeopleFail = (payload) => ({
  type: SET_PEOPLE_FAIL,
  payload,
});

export const getPeople = (url) => async (dispatch /* , getState */) => {
  try {
    const resp = await fetchGet(url);
    if (!resp || (resp.results && resp.results.length === 0)) {
      dispatch(
        setPeopleFail({
          errorMessage: Errors.noPeopleData,
        })
      );
    } else {
      dispatch(setPeople(resp));
    }
  } catch (error) {
    dispatch(
      setPeopleFail({
        errorMessage: error.message ? error.message : Errors.getPeopleError,
      })
    );
  }
};

export const resetPeople = () => ({
  type: RESET_PEOPLE_TO_DEFAULT,
});
