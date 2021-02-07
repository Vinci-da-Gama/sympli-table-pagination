import { Link } from "react-router-dom";

import { RouteLinks } from "../../constant";

const NoFoundCompo = () => {
  return (
    <div>
      <h1>404 -- No Found.</h1>
      <Link to={RouteLinks.initLand}>Go Home</Link>
    </div>
  );
};

export default NoFoundCompo;
