import Navbars from "../../routes/Navigation";

const Layout = ({ children, pageTitle }) => (
  <div>
    <header>
      <Navbars />
    </header>
    <h3>{pageTitle}</h3>
    {children}
    <footer className="footer-grid-container">
      &copy; {new Date().getFullYear()} Sympli Australia Pty Ltd
    </footer>
    <style global="true" jsx="true">{`
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

export default Layout;
