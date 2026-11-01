import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Menu from "./pages/Menu";
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./components/shared/FullScreenLoader";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Tables from "./pages/Tables";
import Header from "./components/shared/Header";
import BottomNav from "./components/shared/BottomNav";
function ProtectedRoutes({ children }) {
  const isAuth = useSelector((state) => state.user.isAuth);

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
function AppContent() {
  
  const isLoading = useLoadData();
  const location = useLocation();
  const isAuth = useSelector((state) => state.user.isAuth);

  const hideNavigation = location.pathname === "/auth" || !isAuth;

  if (isLoading) {
    return <FullScreenLoader />;
  }

  
  return (
    <>
      {!hideNavigation && <Header />}

      <Routes>
        <Route
  path="/"
  element={
    <ProtectedRoutes>
      <Home />
    </ProtectedRoutes>
  }
/>
        <Route path="/auth" element={<Auth />} />
        <Route
  path="/orders"
  element={
    <ProtectedRoutes>
      <Orders />
    </ProtectedRoutes>
  }
/>
        <Route
  path="/tables"
  element={
    <ProtectedRoutes>
      <Tables />
    </ProtectedRoutes>
  }
/>
        <Route
  path="/menu"
  element={
    <ProtectedRoutes>
      <Menu />
    </ProtectedRoutes>
  }
/>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>

      {!hideNavigation && <BottomNav />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
