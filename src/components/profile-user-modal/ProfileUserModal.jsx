import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { handleFollow, handleUnfollow } from "../../service";

export const ProfileUserModal = ({ profileUsers, closeModal, type }) => {
  const [profileUser, setProfileUser] = useState([]);
  const { users, currentUser } = useSelector((state) => state.allUsers);

  useEffect(() => {
    setProfileUser(
      users.filter((curUser) => profileUsers.includes(curUser.uid))
    );
  }, [profileUsers, users]);
  return (
    <>
      <div className="modal modal--alert modal--profile modal--profile--users ">
        <button
          className="btn icon--btn profile--user--close"
          onClick={closeModal}
        >
          <Close />
        </button>
        {profileUser.length > 0 ? (
          <div className="suggestion--card">
            <h2 className="text--center profile--heading">{type}</h2>
            {profileUser.map((user) => (
              <div className="suggestion--item" key={user.uid}>
                <img
                  src={user.profilePictureUrl}
                  alt="Randomuser"
                  className="avatar avatar--circle avatar--xss"
                />
                <Link to={`/user/${user.uid}`}>
                  <p className="post--user--name">
                    {`${user.firstName} ${user.lastName}`}
                  </p>
                </Link>

                <button
                  className={`btn btn--link suggestion--follow ${
                    currentUser.uid === user.uid ? "btn--disabled" : ""
                  }`}
                  disabled={currentUser.uid === user.uid}
                  onClick={() =>
                    currentUser.following.includes(user.uid)
                      ? handleUnfollow(
                          currentUser.uid,
                          currentUser.following,
                          user.uid,
                          user.followers
                        )
                      : handleFollow(
                          currentUser.uid,
                          currentUser.following,
                          user.uid,
                          user.followers
                        )
                  }
                >
                  {currentUser.following.includes(user.uid)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text--center">No {type} user found</p>
        )}
      </div>
      <div className="overlay" onClick={closeModal}></div>
    </>
  );
};
