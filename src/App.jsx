
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";

import Header from "./components/shared/Header";
import BottomNav from "./components/shared/BottomNav";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

      <BottomNav />
    </Router>
  );
}

export default App;