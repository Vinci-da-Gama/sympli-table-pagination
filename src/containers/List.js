import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  PeopleTableHeaders,
  ApiUrls,
  PageTitle,
  ConstNumbers,
  StorageKeys,
} from "../constant";
import { Layout, Spinner, PaginationBtn, ErrorMessage } from "../components";
import { getPeople } from "../reduxers/actions/People.Actions";
import {
  startSetDetails,
  setCurrentPageUrl,
  resetDetails,
} from "../reduxers/actions/Details.Actions";
import { getCurrentPageNum } from "../helpers";

const List = ({
  people,
  next,
  previous,
  success,
  errorMessage,
  getPeople,
  startSetDetails,
  setCurrentPageUrl,
  resetDetails,
}) => {
  useEffect(() => {
    if (people.length === ConstNumbers.ZERO) {
      !sessionStorage.getItem(StorageKeys.currentPageNum)
        ? getPeople()
        : getPeople(
            `${ApiUrls.rootUrl}/${
              ApiUrls.segments.people
            }/?page=${sessionStorage.getItem(StorageKeys.currentPageNum)}`
          );
    }
  }, [getPeople]);

  const changePage = useCallback(
    (e) => {
      getPeople(e.target.value);
    },
    [getPeople]
  );

  if (
    !people ||
    (people.length === ConstNumbers.ZERO &&
      errorMessage.length === ConstNumbers.ZERO)
  )
    return (
      <Layout pageTitle={PageTitle.People}>
        <Spinner />
      </Layout>
    );
  return (
    <Layout pageTitle={PageTitle.People}>
      <table className="m-0-auto table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>
              <div className="columns is-mobile">
                {PeopleTableHeaders.map((el, idx) => (
                  <div key={el + idx} className="column">
                    {el}
                  </div>
                ))}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((el, idx) => (
            <tr key={`${el.name}_${el.birth_year}_${String(idx)}`}>
              <td>
                <NavLink
                  to={`/details/${el.name}`}
                  className="List-link__tablerow"
                  onClick={() => {
                    resetDetails();
                    sessionStorage.setItem(
                      StorageKeys.currentPageNum,
                      String(getCurrentPageNum(previous, next))
                    );
                    startSetDetails({
                      name: el.name,
                      height: el.height,
                      birth_year: el.birth_year,
                      gender: el.gender,
                      films: el.films,
                    });
                    setCurrentPageUrl(
                      `${ApiUrls.rootUrl}/${
                        ApiUrls.segments.people
                      }/?page=${getCurrentPageNum(previous, next)}`
                    );
                  }}
                >
                  <div className="columns is-mobile">
                    <div className="column">{el.name ? el.name : ""}</div>
                    <div className="column">{el.height ? el.height : ""}</div>
                    <div className="column">{el.mass ? el.mass : ""}</div>
                  </div>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
        {(next || previous) && (
          <tfoot>
            <PaginationBtn
              previous={previous}
              next={next}
              changePage={changePage}
            />
          </tfoot>
        )}
      </table>
      <ErrorMessage success={success} errorMessage={errorMessage} />
    </Layout>
  );
};

List.propTypes = {
  people: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  success: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getPeople: PropTypes.func.isRequired,
  startSetDetails: PropTypes.func.isRequired,
  setCurrentPageUrl: PropTypes.func.isRequired,
  resetDetails: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  PeopleReducer: { people, next, previous, success, errorMessage },
}) => ({
  people,
  next,
  previous,
  success,
  errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getPeople: (url) => dispatch(getPeople(url)),
  startSetDetails: (details) => dispatch(startSetDetails(details)),
  setCurrentPageUrl: (currPageDataUrl) =>
    dispatch(setCurrentPageUrl(currPageDataUrl)),
  resetDetails: () => dispatch(resetDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
