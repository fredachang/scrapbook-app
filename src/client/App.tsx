import { Login } from "./components/LogIn";
import { SignUp } from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { GuardedRoute } from "./components/GuardedRoute";
import { Nav } from "./components/Nav";
import { Blocks } from "./components/Blocks";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <GuardedRoute>
              <Home />
            </GuardedRoute>
          }
        />
        <Route
          path="/blocks"
          element={
            <GuardedRoute>
              <Blocks />
            </GuardedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
