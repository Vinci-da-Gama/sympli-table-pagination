import { BrowserRouter as BwsRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

const App = () => (
  <BwsRouter>
    <AppRoutes />
  </BwsRouter>
);

export default App;
