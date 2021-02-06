import PropTypes from "prop-types";

const Layout = ({ children, pageTitle }) => (
  <div className="mx-3 mt-3">
    <header>
      <img
        src="https://www.sympli.com.au/wp-content/uploads/sympli-logo-black.svg"
        className="logo-img"
        alt="Sympli"
      />
    </header>
    <h3 className="is-size-4 has-text-weight-bold">{pageTitle}</h3>
    {children}
    <footer className="footer-grid-container">
      &copy; {new Date().getFullYear()} Sympli Australia Pty Ltd
    </footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default Layout;
