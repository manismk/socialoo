import { filterValues } from "../constant";

export const getSortedPosts = (allPosts, sortType) => {
  if (sortType === filterValues.LATEST) {
    return [...allPosts].sort(
      (post1, post2) => post2.createdAt?.toDate() - post1.createdAt?.toDate()
    );
  }
  if (sortType === filterValues.TRENDING) {
    return [...allPosts].sort(
      (post1, post2) =>
        // prettier-ignore
        (post2.likedIds.length + post2.comments.length)-
        (post1.likedIds.length + post1.comments.length)
    );
  }
};
