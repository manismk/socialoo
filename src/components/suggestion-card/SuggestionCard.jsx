import "./suggestionCard.css";

export const SuggestionCard = () => {
  return (
    <>
      <h3 className="heading--4 text--center">Who to Follow? </h3>
      <div className="suggestion--card">
        {[...new Array(5)].map((item, index) => (
          <div className="suggestion--item" key={index}>
            <img
              src="https://randomuser.me/api/portraits/men/41.jpg"
              alt="Randomuser"
              className="avatar avatar--circle avatar--xs"
            />
            <p className="post--user--name">Test User</p>

            <button className="btn btn--link suggestion--follow">Follow</button>
          </div>
        ))}
      </div>
    </>
  );
};
