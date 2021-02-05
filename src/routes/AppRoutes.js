import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { RouteLinks } from "../constant/RouteRelated";
import List from "../containers/List";
import { NoFound, Spinner } from "../components";

const Details = lazy(() => import("../containers/Details"));

const AppRoutes = () => {
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

export default AppRoutes;
