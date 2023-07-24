import { Route, Routes } from "react-router-dom";
import { GuardedRoute } from "./components/GuardedRoute";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { Blocks } from "./pages/Blocks";
import { Login } from "./pages/LogIn";
import { SignUp } from "./pages/Signup";
import { Channels } from "./pages/Channels";

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
          path="/blocks/:username"
          element={
            <GuardedRoute>
              <Blocks />
            </GuardedRoute>
          }
        />
        <Route
          path="/channels/:username"
          element={
            <GuardedRoute>
              <Channels />
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
