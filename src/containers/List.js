import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { TableHeaders } from "../constant/TableText";
import { Layout, Spinner, PaginationBtn, ErrorMessage } from "../components";
import { getPeople, resetPeople } from "../reduxers/actions/People.Actions";

const List = ({
  people,
  next,
  previous,
  success,
  errorMessage,
  getPeople,
  resetPeople,
}) => {
  useEffect(() => {
    resetPeople();
    getPeople();
    // return () => {}
  }, [getPeople, resetPeople]);

  const changePage = useCallback(
    (e) => {
      getPeople(e.target.value);
    },
    [getPeople]
  );

  if (!people || people.length === 0)
    return (
      <Layout pageTitle="Table with list of people">
        <Spinner />
      </Layout>
    );
  return (
    <Layout pageTitle="Table with list of people">
      <table className="m-0-auto">
        <thead>
          <tr>
            {TableHeaders.map((el, idx) => (
              <th key={el + idx}>{el}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map((el, idx) => (
            <tr key={`${el.name}_${el.birth_year}_${String(idx)}`}>
              <td colSpan={3}>
                <NavLink to={`/details/${el.name}`}>
                  <div className="columns is-mobile">
                    <div className="column">{el.name}</div>
                    <div className="column">{el.height}</div>
                    <div className="column">{el.mass}</div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
