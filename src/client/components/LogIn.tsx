import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [canFetchAuth, setCanFetchAuth] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., store user data in state or localStorage
        console.log(data);
        navigate("/");
      } else {
        // Handle failed login, e.g., display error message
        setMessage("Log in failed!");
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }

    // Reset the form
    setEmail("");
    setPassword("");
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
