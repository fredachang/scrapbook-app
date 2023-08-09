import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
  buttonStyleFull,
  defaultInputStyle,
  formEntry,
  formStyle,
  labelStyle,
  logInModalStyle,
  modalOuterContainerStyle,
} from "../tailwind";

import { GenericButton } from "../components/GenericButton";
import { AuthHeader } from "../components/AuthHeader";

export const Login = () => {
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const variables = {
      email: email,
      password: password,
    };

    login
      .loginAsync(variables)
      .then(() => {
        setMessage("Logged in successfully");
        navigate("/", { replace: true });
      })
      .catch(() => {
        setMessage("Invalid username or login");
      });
  };

  return (
    <>
      <div className={modalOuterContainerStyle}>
        <div className={logInModalStyle}>
          <AuthHeader
            headingText="Log In"
            navigateToPath={"/register"}
            navigateToText="Register"
          />

          <form onSubmit={handleSubmit} className={formStyle}>
            <div className="w-full">
              <div className={formEntry}>
                <label className={labelStyle} htmlFor="email">
                  <p>Email</p>
                </label>
                <input
                  className={defaultInputStyle}
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className={formEntry}>
                <label className={labelStyle} htmlFor="password">
                  <p>Password</p>
                </label>
                <input
                  className={defaultInputStyle}
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>

            <GenericButton
              buttonText="Log In"
              buttonStyle={buttonStyleFull}
              buttonType="submit"
            />
          </form>

          {message && <div>{message}</div>}
        </div>
      </div>
    </>
  );
};
