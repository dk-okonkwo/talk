import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
// Import the generated route tree
// import { routeTree } from './routeTree.gen'
// import * as TanstackQuery from "./integrations/tanstack-query/root-provider";
import App from "./App.tsx";
// import reportWebVitals from "./reportWebVitals.ts";

// Create a new router instance
// const router = createRouter({ routeTree });

// Register the router instance for type safety
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router
//   }
// }

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
