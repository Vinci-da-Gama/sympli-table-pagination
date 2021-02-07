import { SET_DETAILS, SET_CURRENT_PAGE_URL, GET_FILMS_FAIL } from "../../types";
import { Errors } from "../../constant";
import { fetchGet } from "../../helpers";

export const setDetails = (payload) => ({
  type: SET_DETAILS,
  payload,
});

const getFilmsFail = (payload) => ({
  type: GET_FILMS_FAIL,
  payload,
});

export const startSetDetails = (details) => async (dispatch) => {
  try {
    let films = [];
    for (let i = 0; i < details.films.length; i++) {
      const { title } = await fetchGet(details.films[i]);
      films.push(title);
    }
    films.length === details.films.length &&
      dispatch(
        setDetails({
          ...details,
          films,
        })
      );
  } catch (error) {
    dispatch(
      getFilmsFail({
        errorMessage: Errors.getFilmsError,
      })
    );
  }
};

export const setCurrentPageUrl = (payload) => ({
  type: SET_CURRENT_PAGE_URL,
  payload,
});
