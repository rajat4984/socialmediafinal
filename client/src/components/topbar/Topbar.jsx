import React, { useContext, useState } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Topbar() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");

  const [update, setUpdate] = useState(search);
  const navigate = useNavigate();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSearch = async () => {
    setUpdate(search);
    const response = await axios.get("/users/allUsers");
    const data = response.data;
    console.log(data);

    const searchedUser = data.find((item) => {
      return search === item.username;
    });
    console.log(searchedUser);

    if (searchedUser !== undefined) {
      navigate(`/profile/${searchedUser.username}`);
    }
  };

  const logout = () => {
    console.log(sessionStorage.length);
    sessionStorage.setItem("user", null);
    navigate("/login");
    navigate(0);
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MySocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search
            className="searchIcon"
            style={{ cursor: "pointer" }}
            onClick={handleSearch}
          />
          <input
            placeholder="Search for friend,post or video"
            type="text"
            className="searchInput"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link
            to={`/profile/${user?.username}`}
            style={{ color: "white", textDecoration: "none" }}
          >
            <span className="topbarLink">Timeline</span>
          </Link>

          <span className="topbarLink" onClick={logout}>
            Logout
          </span>
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
