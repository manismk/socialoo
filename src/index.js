import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FilterProvider, PostProvider, UserProvider } from "./context";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <UserProvider>
          <PostProvider>
            <FilterProvider>
              <App />
            </FilterProvider>
          </PostProvider>
        </UserProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
