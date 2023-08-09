import ReactDOM from "react-dom/client";
import App from "./App";

import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ScrollToTop } from "./hooks/useScrollToTop";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ScrollToTop />
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
