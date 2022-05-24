import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import { handleCreatePost, handleEditPost } from "../../service";
import { closePostModal } from "../../store/features/postSlice";
import "./createPostModal.css";

const fileTypes = ["JPEG", "PNG", "JPG"];

export const CreatePostModal = () => {
  const [postData, setPostData] = useState({
    caption: "",
    captionError: "",
    imageFile: null,
    imageFileError: "",
    imageLink: "",
  });
  const { isFromEdit, editData } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFromEdit) {
      if (editData.imageUrl === null) {
        setPostData((prev) => ({ ...prev, caption: editData.caption }));
      } else {
        setPostData((prev) => ({
          ...prev,
          caption: editData.caption,
          imageLink: editData.imageUrl,
          imageFile: {},
        }));
      }
    }
  }, []);

  const handleImageUploader = (file) => {
    setPostData((prevData) => ({
      ...prevData,
      imageFile: file,
      imageLink: URL.createObjectURL(file),
      imageFileError: "",
    }));
  };

  const clickHandler = () => {
    if (postData.caption.length && postData.imageFileError.length === 0) {
      if (isFromEdit) {
        handleEditPost(
          editData,
          postData.caption,
          postData.imageLink,
          postData.imageFile
        );
      } else {
        handleCreatePost(
          postData.caption,
          postData.imageFile,
          currentUser?.uid
        );
      }
      dispatch(closePostModal());
    }
    if (postData.caption.length === 0) {
      setPostData((prevData) => ({
        ...prevData,
        captionError: "Caption can't be empty",
      }));
    }
  };
  return (
    <>
      <div className="modal modal--alert modal--post ">
        <h5 className="modal--heading heading--4 text--center">
          {isFromEdit ? "Edit" : "Create New"} Post
        </h5>
        <div className="caption--container">
          <img
            src={currentUser.profilePictureUrl}
            alt=""
            className="avatar avatar--circle avatar--xss"
          />
          <div
            className={`input--container input--${
              postData.captionError.length ? "error" : "standard"
            } `}
          >
            <label htmlFor="bio" className="input--label">
              caption
            </label>
            <textarea
              id="caption--textarea"
              className="bio--textarea"
              value={postData.caption}
              placeholder="Share your thoughts here"
              onChange={(e) => {
                setPostData((prevData) => ({
                  ...prevData,
                  caption: e.target.value,
                  captionError: "",
                }));
              }}
            ></textarea>
            <span className="input--error--message">
              {postData.captionError}
            </span>
          </div>
        </div>

        {postData.imageFileError.length > 0 && (
          <p className="input--error--message text--center">
            {postData.imageFileError}
          </p>
        )}
        {postData.imageLink !== null && postData.imageLink !== "" && (
          <div className="post--modal--image--container">
            <img className="img--res" src={postData.imageLink} alt="" />
          </div>
        )}

        <div className="modal--actions">
          <div className="file--uploader">
            <FileUploader
              multiple={false}
              handleChange={handleImageUploader}
              name="file"
              types={fileTypes}
              maxSize="3"
              onSizeError={() =>
                setPostData((prevData) => ({
                  ...prevData,
                  imageFileError: "Choose image less than 3MB",
                  imageFile: null,
                }))
              }
              onTypeError={() => {
                setPostData((prevData) => ({
                  ...prevData,
                  imageFileError: "Choose image of type JPG,JPEG,PNG",
                  imageFile: null,
                }));
              }}
            />
          </div>
          <div>
            <button
              href="#"
              className="btn btn--primary m-r-1"
              onClick={() => dispatch(closePostModal())}
            >
              Cancel
            </button>

            <button
              href="#"
              className="btn btn--primary "
              onClick={clickHandler}
            >
              {isFromEdit ? "Update" : "Post"}
            </button>
          </div>
        </div>
      </div>
      <div className="overlay" onClick={() => dispatch(closePostModal())}></div>
    </>
  );
};
