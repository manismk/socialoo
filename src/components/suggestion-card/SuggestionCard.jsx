import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleFollow } from "../../service";
import "./suggestionCard.css";

export const SuggestionCard = () => {
  const user = useSelector((state) => state.auth.user);
  const { users, currentUser } = useSelector((state) => state.allUsers);
  const [suggestionUser, setSuggestionUser] = useState([]);
  useEffect(() => {
    setSuggestionUser(
      users.filter(
        (curUser) =>
          curUser.uid !== user.uid &&
          !currentUser?.following?.includes(curUser.uid)
      )
    );
  }, [currentUser, users, user?.uid]);

  return (
    <>
      {suggestionUser.length > 0 && (
        <>
          <h3 className="heading--4 text--center">Who to Follow? </h3>
          <div className="suggestion--card">
            {suggestionUser.map((user) => (
              <div className="suggestion--item" key={user.uid}>
                <img
                  src={user.profilePictureUrl}
                  alt="Randomuser"
                  className="avatar avatar--circle avatar--xs"
                />
                <p className="post--user--name">
                  {`${user.firstName} ${user.lastName}`}
                </p>

                <button
                  className="btn btn--link suggestion--follow"
                  onClick={() =>
                    handleFollow(
                      currentUser.uid,
                      currentUser.following,
                      user.uid,
                      user.followers
                    )
                  }
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
