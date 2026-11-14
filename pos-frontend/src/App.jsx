import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Tables from "./pages/Tables";
import Menu from "./pages/Menu";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/auth" replace />}
        />

        <Route
          path="/auth"
          element={<Auth />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/tables"
          element={<Tables />}
        />

        <Route
          path="/menu"
          element={<Menu />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;