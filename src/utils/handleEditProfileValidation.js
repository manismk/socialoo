import { validateURL } from "./";

export const handleEditProfileValidation = (
  firstNameData,
  lastNameData,
  bioData,
  portfolioLink
) => {
  let portfolioLinkError = "";
  let bioError = "";
  let firstNameError = "";
  let lastNameError = "";

  if (firstNameData.length === 0) firstNameError = "First name can't be Empty";
  if (lastNameData.length === 0) lastNameError = "Last name can't be Empty";
  if (bioData.length === 0) bioError = "Bio can't be Empty";
  if (portfolioLink.length && !validateURL(portfolioLink))
    portfolioLinkError = "Invalid Portfolio URL";

  return {
    firstNameError,
    lastNameError,
    bioError,
    portfolioLinkError,
  };
};
