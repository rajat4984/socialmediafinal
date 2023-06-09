import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Admin from "./pages/admin/Admin";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Register />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
