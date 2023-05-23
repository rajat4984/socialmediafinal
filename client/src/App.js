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

function App() {
  const { user } = useContext(AuthContext);
  return (
    // <Router>
    //   <Switch>
    //     <Route exact path="/">
    //       {user ? <Home /> : <Register />}
    //     </Route>
    //     <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
    //     <Route path="/register">
    //       {user ? <Redirect to="/" /> : <Register />}
    //     </Route>
    //     <Route path="/messenger">
    //       {!user ? <Redirect to="/" /> : <Messenger />}
    //     </Route>
    //     <Route path="/profile/:username">
    //       <Profile />
    //     </Route>
    //   </Switch>
    // </Router>
    <div>
        <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Register />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
            <Route
              path="/messenger"
              // element={user ? <Navigate to="/" /> : <Messenger />}
              element={<Messenger/>}
            />
          <Route
            path="/register"
            // element={user ? <Navigate to="/" /> : <Register />}
            element={<Register />}
          />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
