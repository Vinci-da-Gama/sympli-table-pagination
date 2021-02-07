import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Layout, Spinner } from "../components";
import {
  DetailsHeaders,
  RouteLinks,
  PageTitle,
  ConstNumbers,
  StorageKeys,
} from "../constant";
import { capitalizeString } from "../helpers";
import { getPeople } from "../reduxers/actions/People.Actions";
import {
  setDetails,
  setCurrentPageUrl,
} from "../reduxers/actions/Details.Actions";

const Details = ({
  history,
  details,
  currentPageUrl,
  success,
  errorMessage,
  getPeople,
  setDetails,
  setCurrentPageUrl,
}) => {
  useEffect(() => {
    if (Object.keys(details).length > ConstNumbers.ZERO) {
      localStorage.setItem("targetPerson", JSON.stringify(details));
      localStorage.setItem("currentPageUrl", currentPageUrl);
    }
    if (
      (Object.keys(details).length === ConstNumbers.ZERO || !details) &&
      currentPageUrl === ""
    ) {
      setDetails(JSON.parse(localStorage.getItem(StorageKeys.targetPerson)));
      setCurrentPageUrl(localStorage.getItem(StorageKeys.currentPageUrl));
    }

    return () => {
      localStorage.removeItem(StorageKeys.targetPerson);
      localStorage.removeItem(StorageKeys.currentPageUrl);
    };
  }, [details]);

  if (
    Object.keys(details).length === ConstNumbers.ZERO &&
    errorMessage.length === ConstNumbers.ZERO
  )
    return (
      <Layout pageTitle={PageTitle.Details}>
        <Spinner />
      </Layout>
    );
  return (
    <Layout pageTitle={PageTitle.Details}>
      <section>
        <ul className="Details-ul__noliststyle">
          {Object.keys(details).map((el, idx) => {
            if (el === Object.keys(DetailsHeaders)[ConstNumbers.ZERO]) {
              return (
                <li key={el + String(idx)}>
                  <div className="columns is-mobile">
                    <div className="column">{DetailsHeaders[el]}</div>
                    <div className="column">
                      {!details[el] && details[el].length === 0 ? (
                        "No film..."
                      ) : (
                        <ol className="Details-ul__noliststyle">
                          {details[el].map((elem, index) => (
                            <li key={elem + String(index)}>
                              {index + ConstNumbers.ONE}: {elem}
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  </div>
                </li>
              );
            } else {
              return (
                <li key={el + idx}>
                  <div className="columns is-mobile">
                    <div className="column">
                      {capitalizeString(el).replace("_", " ")}
                    </div>
                    <div className="column">
                      {details[el] ? details[el] : ""}
                    </div>
                  </div>
                </li>
              );
            }
          })}
          <li>
            <div className="columns is-mobile">
              <div className="column">&nbsp;</div>
              <div className="column">
                <button
                  type="button"
                  className="button is-primary"
                  onClick={() => {
                    history.push(RouteLinks.initLand);
                    getPeople(currentPageUrl);
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </Layout>
  );
};

Details.propTypes = {
  history: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  currentPageUrl: PropTypes.string.isRequired,
  success: PropTypes.bool,
  errorMessage: PropTypes.string.isRequired,
  getPeople: PropTypes.func.isRequired,
  setDetails: PropTypes.func.isRequired,
  setCurrentPageUrl: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  DetailsReducer: { details, currentPageUrl, success, errorMessage },
}) => ({
  details,
  currentPageUrl,
  success,
  errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getPeople: (url) => dispatch(getPeople(url)),
  setDetails: (details) => dispatch(setDetails(details)),
  setCurrentPageUrl: (currPeopleDataUrl) =>
    dispatch(setCurrentPageUrl(currPeopleDataUrl)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Details));
