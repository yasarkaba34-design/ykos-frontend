import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './styles/theme.css';

// Ana kök elemanı oluşturuluyor
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
