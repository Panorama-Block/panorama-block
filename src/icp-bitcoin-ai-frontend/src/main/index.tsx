import React from "react";
import ReactDOM from "react-dom/client";
import "../presentation/styles/global.scss"
import Router from "./routes/router";
import "@/styles/globals.css"

const container = document.getElementById("root")

ReactDOM.createRoot(container!).render(
  <Router />
);
