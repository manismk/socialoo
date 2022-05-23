import { filterValues } from "../constant";

export const getSortedPosts = (allPosts, sortType) => {
  if (sortType === filterValues.LATEST) {
    return [...allPosts].sort(
      (post1, post2) =>
        new Date(post2.createdAt?.seconds * 1000) -
        new Date(post1.createdAt?.seconds * 1000)
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
