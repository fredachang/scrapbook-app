import { Route, Routes } from "react-router-dom";
import { GuardedRoute } from "./components/GuardedRoute";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { Blocks } from "./pages/Blocks";
import { Login } from "./pages/LogIn";
import { SignUp } from "./pages/Signup";
import { Channels } from "./pages/Channels";
import { ChannelExpanded } from "./pages/ChannelExpanded";
import { tailwindStyles } from "./tailwind";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <>
      <div
        className={`w-screen h-screen overflow-y-scroll bg-${tailwindStyles.primaryColour}`}
      >
        <div className="w-3% h-screen fixed right-0">
          <Nav />
        </div>

        <div className="pl-2 pt-2 w-97%">
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
              path="/:username"
              element={
                <GuardedRoute>
                  <ProfilePage />
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
            <Route
              path="/channels/:username/:channelTitle/:id/:isPrivate"
              element={
                <GuardedRoute>
                  <ChannelExpanded />
                </GuardedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
