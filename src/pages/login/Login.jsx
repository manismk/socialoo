import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InputPassword, InputTextBox } from "../../components";
import "./auth.css";
import { handleLoginValidation } from "../../utils/";
import { handleSignIn } from "../../service";

export const Login = () => {
  const [userData, setUserData] = useState({
    userMail: "",
    password: "",
    mailError: "",
    passwordError: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const loginHandler = () => {
    const { mailError, passwordError } = handleLoginValidation(
      userData.userMail,
      userData.password
    );

    if (mailError.length || passwordError.length) {
      setUserData((prevData) => ({
        ...prevData,
        mailError: mailError,
        passwordError: passwordError,
      }));
    }
    if (mailError.length === 0 && passwordError.length === 0) {
      handleSignIn(userData.userMail, userData.password, location, navigate);
    }
  };

  return (
    <>
      <main>
        <div className="login--container">
          <h1 className="logo text--center m-b-2">Socialoo</h1>
          <h1 className="heading--3 text--center">Login</h1>
          <InputTextBox
            error={userData.mailError}
            labelName={"Email"}
            id={"email"}
            placeHolder="test@test.com"
            changeHandler={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                userMail: e.target.value,
                mailError: "",
              }));
            }}
            type="email"
            value={userData.userMail}
          />
          <InputPassword
            error={userData.passwordError}
            labelName="Password"
            id="password"
            value={userData.password}
            changeHandler={(e) =>
              setUserData((prevData) => ({
                ...prevData,
                password: e.target.value,
                passwordError: "",
              }))
            }
          />

          <div className="remember--container m-t-1 m-h-1">
            <span className="input--standard">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </span>

            <Link to="/forgotPassword" className="link link--information">
              Forgot Your password
            </Link>
          </div>
          <div className="m-t-1 m-h-1">
            <button
              className="btn btn--primary w-100"
              onClick={() => {
                loginHandler();
              }}
            >
              Login
            </button>
          </div>
          <div className="m-t-1 m-h-1">
            <button
              className="btn btn--primary w-100"
              onClick={() => {
                setUserData((prevData) => ({
                  ...prevData,
                  password: "test1234",
                  userMail: "testuser@gmail.com",
                  mailError: "",
                  passwordError: "",
                }));
              }}
            >
              Fill the test credentials
            </button>
          </div>
          <p className="signup--text m-t-1 m-h-1">
            Don't have a account?
            <Link to="/signUp" className="link link--information">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};
