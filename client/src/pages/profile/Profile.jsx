import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AiFillCamera } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileUser, setProfileUser] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setProfileUser(res.data);
    };
    fetchUser();
  }, [username]);

  const handleProfilePic = async (file) => {
    const newUser = {
      userId: profileUser._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newUser.profilePicture = fileName;
      const user = JSON.parse(sessionStorage.getItem("user"));
      user.profilePicture = fileName;
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      try {
        await axios.post("/upload", data);
        await axios.put(`/users/${profileUser._id}`, {
          userId: profileUser._id,
          profilePicture: fileName,
        });

        window.location.reload();
      } catch (err) {}
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  profileUser.coverPicture
                    ? PF + profileUser.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  profileUser.profilePicture
                    ? PF + profileUser.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <label htmlFor="file">
                <AiFillCamera
                  style={{
                    fontSize: "35px",
                    position: "absolute",
                    top: "85%",
                    left: "52%",
                    cursor: "pointer",
                  }}
                />
                <input
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    handleProfilePic(e.target.files[0]);
                  }}
                />
              </label>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{profileUser.username}</h4>
              <span className="profileInfoDesc">{profileUser.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={profileUser} />
          </div>
        </div>
      </div>
    </>
  );
}
