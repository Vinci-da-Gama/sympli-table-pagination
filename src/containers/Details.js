import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Layout } from "../components";
import { getPeople } from "../reduxers/actions/People.Actions";

const Details = ({ history, details }) => {
  useEffect(() => {
    return () => {
      // clear row data
    };
  }, []);
  return <Layout pageTitle="Detail section">Details...</Layout>;
};

Details.propTypes = {
  history: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
};

const mapStateToProps = ({ DetailsReducer: { details } }) => ({ details });

// const mapDispatchToProps = {}

export default connect(mapStateToProps, null)(withRouter(Details));
