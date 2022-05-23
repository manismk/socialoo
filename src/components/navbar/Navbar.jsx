import { Bookmark, Explore, Home, Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { openPostModal } from "../../store/features/postSlice";
import "./navbar.css";

const activeLink = ({ isActive }) => ({
  color: isActive ? "var(--primary--color)" : "",
});

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="nav--container">
      <div className="logo">
        <Link to="/">Socialoo</Link>
      </div>
      <button
        className="btn btn--primary"
        onClick={() => dispatch(openPostModal())}
      >
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

        <NavLink
          style={activeLink}
          className="nav--item"
          to={`/user/${user?.uid}`}
        >
          <Person />
          <span>Profile</span>
        </NavLink>
      </div>
    </header>
  );
};
