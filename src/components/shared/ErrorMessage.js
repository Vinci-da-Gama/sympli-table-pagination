import PropTypes from "prop-types";

const ErrorMessage = ({ success, errorMessage = "" }) => {
  return (
    <p className="has-text-centered has-text-danger-dark">
      {!success && errorMessage.length > 0 ? errorMessage : " "}
    </p>
  );
};

ErrorMessage.propTypes = {
  success: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
