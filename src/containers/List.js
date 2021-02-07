import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  PeopleTableHeaders,
  ApiUrls,
  PageTitle,
  ConstNumbers,
} from "../constant";
import { Layout, Spinner, PaginationBtn, ErrorMessage } from "../components";
import { getPeople, resetPeople } from "../reduxers/actions/People.Actions";
import {
  startSetDetails,
  setCurrentPageUrl,
} from "../reduxers/actions/Details.Actions";
import { getCurrentPageNum } from "../helpers";

const List = ({
  people,
  next,
  previous,
  success,
  errorMessage,
  getPeople,
  resetPeople,
  startSetDetails,
  setCurrentPageUrl,
}) => {
  useEffect(() => {
    people.length === ConstNumbers.ZERO && getPeople();
    return () => {
      // resetPeople();
    };
  }, [getPeople, resetPeople]);

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
  resetPeople: PropTypes.func.isRequired,
  startSetDetails: PropTypes.func.isRequired,
  setCurrentPageUrl: PropTypes.func.isRequired,
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
  resetPeople: () => dispatch(resetPeople()),
  startSetDetails: (details) => dispatch(startSetDetails(details)),
  setCurrentPageUrl: (currPeopleDataUrl) =>
    dispatch(setCurrentPageUrl(currPeopleDataUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
