import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { RouteLinks } from "../constant";
import List from "../containers/List";
import { NoFound, Spinner } from "../components";

const Details = lazy(() => import("../containers/Details"));

const AppRoutes = ({ history }) => {
  useEffect(() => {
    history.listen((newLocation, action) => {
      // prevent browser back btn go back
      if (action !== "PUSH") {
        history.go(1);
      }
    });
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path={RouteLinks.initLand} component={List} exact={true} />
        <Route path={RouteLinks.details} render={() => <Details />} />
        <Route component={NoFound} />
      </Switch>
    </Suspense>
  );
};

export default withRouter(AppRoutes);
