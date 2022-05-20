import { CameraAlt } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useUser } from "../../context";
import { handleEditProfile } from "../../service";
import { handleEditProfileValidation } from "../../utils";
import { InputTextBox } from "../input/InputTextBox";
import "./editProfileModal.css";

export const EditProfileModal = ({ closeModal }) => {
  const { allUsers } = useUser();
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    firstNameError: "",
    lastNameError: "",
    bio: "",
    bioError: "",
    profileImage: "",
    portfolioLink: "",
    portfolioLinkError: "",
    profileImageError: "",
    raw: "",
  });

  useEffect(() => {
    if (allUsers?.currentUser.firstName !== undefined) {
      setEditData((prev) => ({
        ...prev,
        firstName: allUsers?.currentUser.firstName,
        lastName: allUsers?.currentUser.lastName,
        bio: allUsers?.currentUser.bio,
        profileImage: allUsers?.currentUser.profilePictureUrl,
        portfolioLink: allUsers?.currentUser.portfolioLink,
      }));
    }
  }, [allUsers?.currentUser]);

  const editHandler = () => {
    const { firstNameError, lastNameError, bioError, portfolioLinkError } =
      handleEditProfileValidation(
        editData.firstName,
        editData.lastName,
        editData.bio,
        editData.portfolioLink
      );

    if (
      bioError.length ||
      portfolioLinkError.length ||
      lastNameError.length ||
      firstNameError.length
    ) {
      setEditData((prevData) => ({
        ...prevData,
        firstNameError,
        lastNameError,
        bioError,
        portfolioLinkError,
      }));
    }
    if (
      bioError.length === 0 &&
      portfolioLinkError.length === 0 &&
      firstNameError.length === 0 &&
      lastNameError.length === 0 &&
      editData.profileImageError.length === 0
    ) {
      closeModal();
      handleEditProfile(
        editData.firstName,
        editData.lastName,
        editData.bio,
        editData.portfolioLink,
        editData.profileImage,
        editData.raw,
        allUsers?.currentUser
      );
    }
  };

  const setEdit = (e, field, fieldError) => {
    setEditData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
      [fieldError]: "",
    }));
  };

  return (
    <>
      <div className="modal modal--alert modal--profile ">
        <h5 className="modal--heading heading--4 text--center">Edit profile</h5>
        <div className="edit--img--badge">
          <div className="badge--container ">
            <img
              src={editData.profileImage}
              alt={`${editData.firstName} ${editData.lastName}`}
              className="m-r-1 avatar avatar--circle avatar--md"
            />

            <label>
              <input
                type="file"
                id="upload_file"
                className="upload--button"
                accept="image/*"
                name=""
                onChange={(e) => {
                  if (e.target.files[0].size < 2 * Math.pow(10, 6))
                    setEditData((prev) => ({
                      ...prev,
                      profileImage: URL.createObjectURL(e.target.files[0]),
                      raw: e.target.files[0],
                      profileImageError: "",
                    }));
                  else
                    setEditData((prev) => ({
                      ...prev,
                      profileImageError: "Choose Image Less than 2MB",
                      profileImage: URL.createObjectURL(e.target.files[0]),
                    }));
                }}
              />
              <CameraAlt className="badge badge--button" />
            </label>
          </div>
        </div>
        {editData.profileImageError.length > 0 && (
          <p className="input--error--message text--center">
            {editData.profileImageError}
          </p>
        )}

        <div className="signup--name--container">
          <InputTextBox
            error={editData.firstNameError}
            labelName="First Name"
            id="firstName"
            changeHandler={(e) => setEdit(e, "firstName", "firstNameError")}
            value={editData.firstName}
            type="text"
            placeHolder="John"
          />
          <InputTextBox
            error={editData.lastNameError}
            labelName="Last Name"
            id="lastName"
            changeHandler={(e) => setEdit(e, "lastName", "lastNameError")}
            value={editData.lastName}
            type="text"
            placeHolder="Doe"
          />
        </div>
        <div
          className={`input--container input--${
            editData.bioError.length ? "error" : "standard"
          } m-t-2`}
        >
          <label htmlFor="bio" className="input--label">
            Bio
          </label>
          <textarea
            id="w3review"
            name="w3review"
            className="bio--textarea"
            value={editData.bio}
            placeholder="I am john doe. I work at XXX company"
            onChange={(e) => setEdit(e, "bio", "bioError")}
          ></textarea>
          <span className="input--error--message">{editData.bioError}</span>
        </div>

        <InputTextBox
          error={editData.portfolioLinkError}
          labelName="PortFolio Link"
          id="portfolio-link"
          changeHandler={(e) =>
            setEdit(e, "portfolioLink", "portfolioLinkError")
          }
          value={editData.portfolioLink}
          type="text"
          placeHolder="https://www.google.com/"
        />
        <div className="modal--actions">
          <button href="#" className="btn btn--primary " onClick={closeModal}>
            Cancel
          </button>
          <button href="#" className="btn btn--primary " onClick={editHandler}>
            Save
          </button>
        </div>
      </div>
      <div className="overlay " onClick={closeModal}></div>
    </>
  );
};
