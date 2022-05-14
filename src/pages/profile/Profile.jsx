import "./profile.css";
import { EditProfileModal, PostCard } from "../../components/";
import { Logout } from "@mui/icons-material";
import { useAuth, usePosts, useUser } from "../../context";
import { useEffect, useState } from "react";

export const Profile = () => {
  const { signOut } = useAuth();
  const { allUsers } = useUser();
  const { posts } = usePosts();
  const [showEditModal, setEditModal] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({
    posts: [],
  });
  useEffect(() => {
    setCurrentUserData((prev) => ({
      ...prev,
      posts: posts.posts.filter(
        (post) => post.uid === allUsers?.currentUser?.uid
      ),
    }));
  }, [posts, allUsers?.currentUser?.uid]);

  return (
    <>
      <div className="profile--container">
        <button className="btn icon--btn btn--logout" onClick={() => signOut()}>
          <Logout />
          <span>Logout</span>
        </button>

        <img
          src={allUsers?.currentUser?.profilePictureUrl}
          alt={`${allUsers?.currentUser?.firstName} ${allUsers?.currentUser?.lastName}`}
          className="avatar avatar--circle avatar--md m-b-1"
        />

        <p className="profile--user--name m-b-1">{`${allUsers?.currentUser?.firstName} ${allUsers?.currentUser?.lastName}`}</p>
        <button className="btn btn--primary" onClick={() => setEditModal(true)}>
          Edit profile
        </button>
        <p className="profile--bio m-v-1">{allUsers?.currentUser?.bio}</p>
        {allUsers?.currentUser?.portfolioLink?.length > 0 && (
          <a
            href={allUsers?.currentUser?.portfolioLink}
            className="profile--bio--link primary-color m-b-1"
            target="_blank"
            rel="noreferrer"
          >
            Portfolio
          </a>
        )}
        <div className="profile--details--container">
          <div className="profile--details--item">
            <p className="profile--details--count">
              {currentUserData.posts.length}
            </p>
            <p className="profile--details--name">Posts</p>
          </div>
          <div className="profile--details--item">
            <p className="profile--details--count">100</p>
            <p className="profile--details--name">Followers</p>
          </div>
          <div className="profile--details--item">
            <p className="profile--details--count">0</p>
            <p className="profile--details--name">Following</p>
          </div>
        </div>
      </div>
      <div className="profile--posts ">
        <h3 className="heading--3 text--center m-t-2 m-b-1">Recent Posts</h3>
        <div className="profile--post--container">
          {currentUserData.posts.map((post) => (
            <PostCard post={post} key={post.postId} />
          ))}
        </div>
      </div>
      {showEditModal && (
        <EditProfileModal closeModal={() => setEditModal(false)} />
      )}
    </>
  );
};
