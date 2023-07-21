import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        setMessage(`${response.statusText}: User already exists`);
      }
      const responseData = await response.json();
      navigate("/login");

      setMessage("User created successfully!");
    } catch (error) {
      console.log("Error parsing JSON:", error);
    }
  };

  const outerContainer = "w-full h-screen flex justify-center items-center";
  const innerContainer =
    "p-4 w-96 h-2/5 flex flex-col justify-center items-center border border-black rounded-3xl";

  const formStyle =
    "flex flex-col justify-between items-center w-full h-4/5 mt-5";

  const formEntry = "flex justify-between pb-3";

  const input = "w-3/5 border-b border-black";

  const buttonStyle = "bg-black text-white w-4/5 mb-2 rounded-md py-1 px-2";

  const linkStyle = "text-black w-1/5 mb-2";

  return (
    <>
      <div className={outerContainer}>
        <div className={innerContainer}>
          <h1 className="text-4xl text-center">Register</h1>

          <form onSubmit={handleSubmit} className={formStyle}>
            <div className="w-full">
              <div className={formEntry}>
                <label htmlFor="firstName">First Name:</label>
                <input
                  className={input}
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={formEntry}>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  className={input}
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className={formEntry}>
                <label htmlFor="email">Email:</label>
                <input
                  className={input}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={formEntry}>
                <label htmlFor="password">Password:</label>
                <input
                  className={input}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className={buttonStyle} type="submit">
              Sign Up
            </button>
          </form>

          <button className={linkStyle} onClick={() => navigate("/login")}>
            Log In
          </button>

          {message && <div>{message}</div>}
        </div>
      </div>
    </>
  );
};
