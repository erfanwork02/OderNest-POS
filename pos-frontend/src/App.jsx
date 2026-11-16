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
import BottomNav from "./components/shared/BottomNav";

import Header from "./components/shared/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT */}
        <Route
          path="/"
          element={<Navigate to="/auth" replace />}
        />

        {/* LOGIN */}
        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />

        {/* ORDERS */}
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />

        {/* TABLES */}
        <Route
          path="/tables"
          element={
            <>
              <Header />
              <Tables />
            </>
          }
        />

        {/* MENU */}
        <Route
          path="/menu"
          element={
            <>
              <Header />
              <Menu />
            </>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <BottomNav />
              <Dashboard />
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;