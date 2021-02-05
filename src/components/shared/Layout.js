import Navbars from "../../routes/Navigation";

const Layout = ({ children, pageTitle }) => (
  <div>
    <header>
      <Navbars />
    </header>
    <h3>{pageTitle}</h3>
    {children}
    <footer>footer...</footer>
  </div>
);

export default Layout;
