import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GlobalProvider } from "./context/GlobalState";
import "./assets/css/uicons-regular-rounded.css";
import "./assets/css/uicons-solid-rounded.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
