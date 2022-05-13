import { Bookmark, Explore, Home, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { usePosts } from "../../context";
import "./navbar.css";

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
        <Link className="nav--item" to="/">
          <Home />
          <span>Home</span>
        </Link>
        <Link className="nav--item" to="/">
          <Explore />
          <span>Explore</span>
        </Link>

        <Link className="nav--item" to="/">
          <Bookmark />
          <span>Saved</span>
        </Link>

        <Link className="nav--item" to="/profile">
          <Person />
          <span>Profile</span>
        </Link>
      </div>
    </header>
  );
};
