import PropTypes from "prop-types";

const Layout = ({ children, pageTitle }) => (
  <div>
    <header>
      <img
        src="https://www.sympli.com.au/wp-content/uploads/sympli-logo-black.svg"
        className="logo-img"
        alt="Sympli"
      />
    </header>
    <h3>{pageTitle}</h3>
    {children}
    <footer className="footer-grid-container">
      &copy; {new Date().getFullYear()} Sympli Australia Pty Ltd
    </footer>
    <style global="true" jsx="true">{`
      .logo-img {
        max-width: 150px;
      }
      .m-0-auto {
        margin: 0 auto;
      }
      .tbc-vertical-middle {
        vertical-align: middle;
      }
      .footer-grid-container {
        display: grid;
        place-items: center center;
        place-content: center center;
        grid-auto-flow: row;
        margin: 1em auto;
        max-width: 320px;
        font-size: 10px;
        line-height: 14px;
      }
    `}</style>
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
