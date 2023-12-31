import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
  authModalStyle,
  buttonStyleFull,
  buttonStyleFullNoBorder,
  defaultInputStyle,
  formEntry,
  formStyle,
  labelStyle,
  modalOuterContainerStyle,
  twStyle,
  twText,
} from "../tailwind";

import { GenericButton } from "../components/GenericButton";
import { AuthHeader } from "../components/AuthHeader";
import { motion } from "framer-motion";
import { durationSettings, easeSettings, fade } from "../motion";

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
      .catch((e) => {
        if (e instanceof Error) {
          setMessage(e.message);
        }
      });
  };

  return (
    <>
      <div className={modalOuterContainerStyle}>
        <div className={authModalStyle}>
          <AuthHeader />

          <motion.form
            initial="hidden"
            animate="visible"
            variants={fade(durationSettings.slow, easeSettings.easeInOut)}
            onSubmit={handleSubmit}
            className={formStyle}
          >
            <div className="w-full">
              <div className={formEntry}>
                <label className={labelStyle} htmlFor="email">
                  <p className={twText.paragraph}>Email</p>
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
                  <p className={twText.paragraph}>Password</p>
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

            {message && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fade(durationSettings.fast, easeSettings.easeInOut)}
                className="text-center font-regular text-sm text-red-600"
              >
                {message}
              </motion.div>
            )}

            <GenericButton
              buttonText="Log In"
              buttonStyle={buttonStyleFull}
              buttonType="submit"
            />
          </motion.form>

          <div className={`w-full mt-${twStyle.spacingSm}`}>
            <GenericButton
              buttonText="Register"
              buttonStyle={buttonStyleFullNoBorder}
              buttonType="button"
              handleOnClick={() => navigate("/register")}
            />
          </div>
        </div>
      </div>
    </>
  );
};
