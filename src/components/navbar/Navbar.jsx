import { Bookmark, Explore, Home, Person } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { usePosts } from "../../context";
import "./navbar.css";

const activeLink = ({ isActive }) => ({
  color: isActive ? "var(--primary--color)" : "",
});

export const Navbar = () => {
  const { openModal } = usePosts();

  return (
    <header className="nav--container">
      <div className="logo">
        <Link to="/">Socialoo</Link>
      </div>
      <button className="btn btn--primary" onClick={openModal}>
        Create Post
      </button>
      <div className="navbar--action--container">
        <NavLink style={activeLink} className="nav--item" to="/">
          <Home />
          <span>Home</span>
        </NavLink>
        <NavLink style={activeLink} className="nav--item" to="/explore">
          <Explore />
          <span>Explore</span>
        </NavLink>

        <NavLink style={activeLink} className="nav--item" to="/saved">
          <Bookmark />
          <span>Saved</span>
        </NavLink>

        <NavLink style={activeLink} className="nav--item" to="/profile">
          <Person />
          <span>Profile</span>
        </NavLink>
      </div>
    </header>
  );
};
