import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const loggedUser = useContext(AuthContext).user;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    loggedUser.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
      setFollowed(loggedUser.followings.includes(user?._id));
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
        setFollowed(!followed);
        deleteConversation();
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        setFollowed(!followed);
        createConversation();
      }
    } catch (err) {}
  };

  const createConversation = async () => {
    const conversation = { senderId: loggedUser._id, receiverId: user?._id };

    try {
      await axios.post("/conversations", conversation);
      console.log(conversation);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteConversation = async () => {
    const res = await axios.get("/conversations/" + user?._id);
    const data = res.data;
    const myConversation = data.filter((conv) => {
      console.log(conv);
      return conv.members[0] === loggedUser._id && conv.members[1] === user._id;
    });
    console.log(myConversation);
    await axios.delete("/conversations/deleteConv/" + myConversation[0]._id);
  };

  const HomeRightbar = () => {
    return (
      <>

      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

        <div className="rightbarFollowings">
          {friends.length === 0 ? (
            <h4 className="rightbarTitle">No friends</h4>
          ) : (
            <>
              <h4 className="rightbarTitle">User Friends</h4>
              {friends.map((friend) => (
                <Link
                  to={"/profile/" + friend.username}
                  style={{ textDecoration: "none" }}
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        friend.profilePicture
                          ? PF + friend.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">
                      {friend.username}
                    </span>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
