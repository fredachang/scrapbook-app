import { Login } from "./components/LogIn";
import { SignUp } from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>

      {/* <UserBlocks /> */}
    </>
  );
}

export default App;
