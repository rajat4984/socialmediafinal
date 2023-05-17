import { Link } from "react-router-dom";
import "./sidebar.css";
import { RssFeed, Chat, AccountBox } from "@material-ui/icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link style={{color:"black",textDecoration:"none"}} to="/">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link style={{color:"black",textDecoration:"none"}} to="/messenger">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
