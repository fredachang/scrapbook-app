import { useEffect, useState } from "react";
import { Login } from "./components/LogIn";
import { SignUp } from "./components/Signup";
import { UserBlocks } from "./components/UserBlocks";

function App() {
  return (
    <>
      <div className="bg-red-100">
        <Login />
      </div>

      <div className="bg-yellow-100">
        <SignUp />
      </div>
      {/* <UserBlocks /> */}
    </>
  );
}

export default App;
