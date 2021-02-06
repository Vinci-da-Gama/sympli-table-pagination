import {
  SET_PEOPLE,
  SET_PEOPLE_FAIL,
  RESET_PEOPLE_TO_DEFAULT,
} from "../../types";
import { Errors } from "../../constant/Errors";

const rootUrl = "https://swapi.dev/api";

const setPeople = (payload) => ({
  type: SET_PEOPLE,
  payload,
});

const setPeopleFail = (payload) => ({
  type: SET_PEOPLE_FAIL,
  payload,
});

export const getPeople = (url) => async (dispatch /* , getState */) => {
  try {
    const resp = await (
      await fetch(url ? `${url}` : `${rootUrl}/people`)
    ).json();
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
