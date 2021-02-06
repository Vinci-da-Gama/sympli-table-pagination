import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { TableHeaders, PaginationBtns } from "../constant/TableText";
import { RouteLinks } from "../constant/RouteRelated";
import { Layout, Spinner } from "../components";
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
                <NavLink to={RouteLinks.details}>
                  <div className="columns">
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
            <tr>
              <td>{PaginationBtns.Pagination}</td>
              <td>
                <button
                  type="button"
                  className="button is-primary mx-1"
                  disabled={!previous}
                  onClick={() => {
                    getPeople(previous);
                  }}
                >
                  {PaginationBtns.Back}
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="button is-info"
                  disabled={!next}
                  onClick={() => {
                    getPeople(next);
                  }}
                >
                  {PaginationBtns.Next}
                </button>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      <p className="text-center text-danger">
        {!success && errorMessage.length > 0 ? errorMessage : " "}
      </p>
    </Layout>
  );
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
