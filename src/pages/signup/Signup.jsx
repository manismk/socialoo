import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InputPassword, InputTextBox } from "../../components";
import { handleSignUp } from "../../service";
import { handleSignUpValidation } from "../../utils";

export const SignUp = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userMail: "",
    password: "",
    firstNameError: "",
    lastNameError: "",
    mailError: "",
    passwordError: "",
    confirmPassword: "",
    confirmPasswordError: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const signUpHandler = () => {
    const {
      firstNameError,
      lastNameError,
      mailError,
      passwordError,
      confirmPasswordError,
    } = handleSignUpValidation(
      userData.firstName,
      userData.lastName,
      userData.userMail,
      userData.password,
      userData.confirmPassword
    );

    if (
      mailError.length ||
      passwordError.length ||
      lastNameError.length ||
      firstNameError.length ||
      confirmPasswordError.length
    ) {
      setUserData((prevData) => ({
        ...prevData,
        mailError: mailError,
        passwordError: passwordError,
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        confirmPasswordError: confirmPasswordError,
      }));
    }
    if (
      mailError.length === 0 &&
      passwordError.length === 0 &&
      firstNameError.length === 0 &&
      lastNameError.length === 0 &&
      confirmPasswordError.length === 0
    ) {
      handleSignUp(
        userData.userMail,
        userData.password,
        userData.firstName,
        userData.lastName,
        location,
        navigate
      );
    }
  };

  return (
    <>
      <main>
        <div className="login--container">
          <h1 className="logo text--center m-b-2">Socialoo</h1>
          <h1 className="heading--3 text--center">Sign Up</h1>
          <div className="signup--name--container">
            <InputTextBox
              error={userData.firstNameError}
              labelName="First Name"
              id="firstName"
              changeHandler={(e) => {
                setUserData((prevData) => ({
                  ...prevData,
                  firstName: e.target.value,
                  firstNameError: "",
                }));
              }}
              value={userData.firstName}
              type="text"
              placeHolder="John"
            />
            <InputTextBox
              error={userData.lastNameError}
              labelName="Last Name"
              id="lastName"
              changeHandler={(e) => {
                setUserData((prevData) => ({
                  ...prevData,
                  lastName: e.target.value,
                  lastNameError: "",
                }));
              }}
              value={userData.lastName}
              type="text"
              placeHolder="Doe"
            />
          </div>
          <InputTextBox
            error={userData.mailError}
            labelName="Email"
            id="email"
            changeHandler={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                userMail: e.target.value,
                mailError: "",
              }));
            }}
            value={userData.userMail}
            type="email"
            placeHolder="johndoe@example.com"
          />

          <InputPassword
            error={userData.passwordError}
            labelName="Password"
            id="password"
            value={userData.password}
            changeHandler={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                password: e.target.value,
                passwordError: "",
              }));
            }}
          />
          <InputPassword
            error={userData.confirmPasswordError}
            labelName="Confirm password"
            id="confirmPassword"
            value={userData.confirmPassword}
            changeHandler={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                confirmPassword: e.target.value,
                confirmPasswordError: "",
              }));
            }}
          />

          <div className="remember--container m-t-1 m-h-1">
            <span className="input--standard">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Accept to terms & conditions</label>
            </span>
          </div>
          <div className="m-t-1 m-h-1">
            <button
              className="btn btn--primary w-100"
              onClick={() => {
                signUpHandler();
              }}
            >
              Sign Up
            </button>
          </div>
          <p className="signup--text m-t-1 m-h-1">
            Already Have a account?
            <Link to="/login" className="link link--information">
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};
