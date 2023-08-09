import { useState } from "react";
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
import { AuthHeader } from "../components/AuthHeader";
import { GenericButton } from "../components/GenericButton";

export const SignUp = () => {
  const { signup } = useAuthContext();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const variables = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    signup.mutateAsync(variables).then(() => {
      setMessage("Signed up successfully");
      navigate("/login", { replace: true });
    });
  };

  return (
    <>
      <div className={modalOuterContainerStyle}>
        <div className={logInModalStyle}>
          <AuthHeader
            headingText="Register"
            navigateToText="Log In"
            navigateToPath="/login"
          />

          <form onSubmit={handleSubmit} className={formStyle}>
            <div className="w-full">
              <div className={formEntry}>
                <label className={labelStyle} htmlFor="firstName">
                  <p>First Name:</p>
                </label>
                <input
                  className={defaultInputStyle}
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={formEntry}>
                <label htmlFor="lastName" className={labelStyle}>
                  <p>Last Name:</p>
                </label>
                <input
                  className={defaultInputStyle}
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className={formEntry}>
                <label htmlFor="email" className={labelStyle}>
                  <p>Email:</p>
                </label>
                <input
                  className={defaultInputStyle}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={formEntry}>
                <label htmlFor="password" className={labelStyle}>
                  <p>Password:</p>
                </label>
                <input
                  className={defaultInputStyle}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <GenericButton
              buttonText="Register"
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
