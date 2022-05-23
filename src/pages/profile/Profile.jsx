import "./profile.css";
import { EditProfileModal, Loader, PostCard } from "../../components/";
import { Logout } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleFollow, handleSignOut, handleUnfollow } from "../../service";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const { users, currentUser } = useSelector((state) => state.allUsers);

  const [showEditModal, setEditModal] = useState(false);
  const { userId } = useParams();
  const [currentProfileData, setCurrentProfile] = useState({
    posts: [],
    currentUser: {},
    isProfileUserLoggedInUser: false,
    isLoggedInUserFollowingThisProfile: false,
  });

  useEffect(() => {
    setCurrentProfile((prev) => ({
      ...prev,
      posts: posts.filter((post) => post.uid === userId),
      currentUser: users.find((user) => user.uid === userId),
      isProfileUserLoggedInUser: user?.uid === userId,
      isLoggedInUserFollowingThisProfile:
        currentUser?.following?.includes(userId),
    }));
  }, [userId, posts, users, currentUser, user?.uid]);

  return (
    <>
      {currentProfileData.currentUser !== undefined ? (
        <>
          <div className="profile--container">
            {currentProfileData.isProfileUserLoggedInUser && (
              <button
                className="btn icon--btn btn--logout"
                onClick={() => handleSignOut(navigate)}
              >
                <Logout />
                <span>Logout</span>
              </button>
            )}

            <img
              src={currentProfileData.currentUser?.profilePictureUrl}
              alt={`${currentProfileData?.currentUser?.firstName} ${currentProfileData?.currentUser?.lastName}`}
              className="avatar avatar--circle avatar--md m-b-1"
            />

            <p className="profile--user--name m-b-1">{`${currentProfileData?.currentUser?.firstName} ${currentProfileData?.currentUser?.lastName}`}</p>
            {currentProfileData.isProfileUserLoggedInUser ? (
              <button
                className="btn btn--primary"
                onClick={() => setEditModal(true)}
              >
                Edit profile
              </button>
            ) : (
              <button
                className="btn btn--primary"
                onClick={() =>
                  currentProfileData.isLoggedInUserFollowingThisProfile
                    ? handleUnfollow(
                        currentUser.uid,
                        currentUser.following,
                        currentProfileData.currentUser.uid,
                        currentProfileData.currentUser.followers
                      )
                    : handleFollow(
                        currentUser.uid,
                        currentUser.following,
                        currentProfileData.currentUser.uid,
                        currentProfileData.currentUser.followers
                      )
                }
              >
                {currentProfileData.isLoggedInUserFollowingThisProfile
                  ? "Unfollow"
                  : "Follow"}
              </button>
            )}
            <p className="profile--bio m-v-1">
              {currentProfileData?.currentUser?.bio}
            </p>
            {currentProfileData?.currentUser?.portfolioLink?.length > 0 && (
              <a
                href={currentProfileData?.currentUser?.portfolioLink}
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
                  {currentProfileData.posts?.length}
                </p>
                <p className="profile--details--name">Posts</p>
              </div>
              <div className="profile--details--item">
                <p className="profile--details--count">
                  {currentProfileData.currentUser?.followers?.length}
                </p>
                <p className="profile--details--name">Followers</p>
              </div>
              <div className="profile--details--item">
                <p className="profile--details--count">
                  {currentProfileData.currentUser?.following?.length}
                </p>
                <p className="profile--details--name">Following</p>
              </div>
            </div>
          </div>
          <div className="profile--posts ">
            {currentProfileData.posts?.length > 0 ? (
              <>
                <h3 className="heading--3 text--center m-t-2 m-b-1">
                  Recent Posts
                </h3>
                <div className="profile--post--container">
                  {currentProfileData.posts.map((post) => (
                    <PostCard post={post} key={post.postId} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text--center para--md text--bold">
                No posts posted by the user
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="text--center para--md text--bold">No users found</p>
      )}
      {showEditModal && (
        <EditProfileModal closeModal={() => setEditModal(false)} />
      )}
      {/* {postLoading && <Loader />} */}
    </>
  );
};
