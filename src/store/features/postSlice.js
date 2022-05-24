import { filterValues } from "../../constant";
import { getSortedPosts } from "../../utils";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  posts: [],
  isCreatePostModalOpen: false,
  isFromEdit: false,
  editData: {},
  sort: filterValues.LATEST,
  filteredPosts: [],
  postLoadingStatus: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    openPostModal: (state) => {
      state.isCreatePostModalOpen = true;
    },
    closePostModal: (state) => {
      state.isCreatePostModalOpen = false;
      state.isFromEdit = false;
      state.editData = {};
    },
    openPostModalFromEdit: (state, { payload }) => {
      state.isCreatePostModalOpen = true;
      state.isFromEdit = true;
      state.editData = payload;
    },
    setPostData: (state, { payload }) => {
      state.posts = payload;
    },
    updateFilteredPosts: (state, { payload }) => {
      state.filteredPosts = getSortedPosts(payload, state.sort);
    },
    filterChange: (state, { payload }) => {
      state.sort = payload.sort;
      state.filteredPosts = getSortedPosts(state.posts, payload.sort);
    },
    setPostLoading: (state, { payload }) => {
      state.postLoadingStatus = payload;
    },
  },
});

export const {
  openPostModal,
  closePostModal,
  setPostData,
  openPostModalFromEdit,
  updateFilteredPosts,
  filterChange,
  setPostLoading,
} = postSlice.actions;

export default postSlice.reducer;
