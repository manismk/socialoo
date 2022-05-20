export const routes = {
  HOME_PAGE: "/",
  LOGIN_PAGE: "/login",
  SIGNUP_PAGE: "/signup",
  PROFILE_PAGE: "/user/:userId",
  SAVED_PAGE: "/saved",
  EXPLORE_PAGE: "/explore",
  POST_PAGE: "/post/:postId",
};

export const filterActions = {
  POSTS_CHANGE: "POSTS_CHANGE",
  SORT_CHANGE: "SORT_CHANGE",
};

export const filterValues = {
  LATEST: "latest",
  TRENDING: "trending",
};
