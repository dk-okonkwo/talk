import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Regisiter {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
