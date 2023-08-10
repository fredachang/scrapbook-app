import { Route, Routes } from "react-router-dom";
import { GuardedRoute } from "./components/GuardedRoute";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { Blocks } from "./pages/Blocks";
import { Login } from "./pages/LogIn";
import { SignUp } from "./pages/Signup";
import { Channels } from "./pages/Channels";
import { ChannelExpanded } from "./pages/ChannelExpanded";
import { twStyle } from "./tailwind";

function App() {
  return (
    <>
      <div className={`w-3% h-screen fixed right-0`}>
        <Nav />
      </div>

      <div className={`px-${twStyle.spacingLg} w-97% pt-${twStyle.spacing2Xl}`}>
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
    </>
  );
}

export default App;
