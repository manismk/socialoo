import { filterActions } from "../constant";
import { getSortedPosts } from "../utils";

let allPosts = [];

export const filterReducer = (state, action) => {
  switch (action.type) {
    case filterActions.POSTS_CHANGE:
      allPosts = action.payload.posts;
      return {
        ...state,
        filteredPosts: getSortedPosts(allPosts, state.sort),
      };
    case filterActions.SORT_CHANGE:
      getSortedPosts(allPosts, action.payload.sort);
      return {
        ...state,
        filteredPosts: getSortedPosts(allPosts, action.payload.sort),
        sort: action.payload.sort,
      };
    default:
      return state;
  }
};
