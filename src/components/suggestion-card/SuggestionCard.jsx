import { useEffect, useState } from "react";
import { useAuth, useUser } from "../../context";
import { handleFollow } from "../../service";
import "./suggestionCard.css";

export const SuggestionCard = () => {
  const { user } = useAuth();
  const { allUsers } = useUser();
  const [suggestionUser, setSuggestionUser] = useState([]);
  useEffect(() => {
    setSuggestionUser(
      allUsers.users.filter(
        (curUser) =>
          curUser.uid !== user.uid &&
          !allUsers?.currentUser?.following?.includes(curUser.uid)
      )
    );
  }, [allUsers, user.uid]);

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
                      allUsers?.currentUser.uid,
                      allUsers?.currentUser.following,
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
