import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TeamProvider } from "./context/TeamContext.jsx";
import { SearchProvider } from "./context/SearchContext";
import "./App.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TeamProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </TeamProvider>
    </BrowserRouter>
  </React.StrictMode>
);
