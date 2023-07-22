import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

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

    login.loginAsync(variables).then(() => {
      setMessage("Logged in successfully");
      navigate("/", { replace: true });
    });
  };

  const outerContainer = "w-full h-screen flex justify-center items-center";
  const innerContainer =
    "p-4 w-96 h-2/5 flex flex-col justify-center items-center border border-black rounded-3xl";

  const formStyle =
    "flex flex-col justify-between items-center w-full h-3/5 mt-5";

  const formEntries = "flex justify-between pb-3";

  const input = "w-3/5 border-b border-black";

  const buttonStyle = "bg-black text-white w-4/5 mb-2 rounded-md py-1 px-2";

  const linkStyle = "text-black w-1/5 mb-2";

  return (
    <>
      <div className={outerContainer}>
        <div className={innerContainer}>
          <h1 className="text-4xl text-center">Login</h1>
          <form onSubmit={handleSubmit} className={formStyle}>
            <div className="w-full">
              <div className={formEntries}>
                <label className="text-xl" htmlFor="email">
                  Email
                </label>
                <input
                  className={input}
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className={formEntries}>
                <label className="text-xl" htmlFor="password">
                  Password
                </label>
                <input
                  className={input}
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>

            <button className={buttonStyle} type="submit">
              Login
            </button>
          </form>

          <button className={linkStyle} onClick={() => navigate("/register")}>
            Register
          </button>
          {message && <div>{message}</div>}
        </div>
      </div>
    </>
  );
};
