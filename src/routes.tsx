import {
  createRootRoute,
  Router,
  type AnyRoute,
  Route,
  createRouter,
} from "@tanstack/react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Saved from "./pages/Saved";
import Billboard from "./pages/Billboard";
import Page from "./pages/Layout";
import Workshop from "./pages/Workshop";
import Taka from "./pages/Taka";
import Products from "./pages/Products";
import Services from "./pages/Services";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const appRoot = createRootRoute({
  component: Page,
});

const homeRoute = new Route({
  getParentRoute: () => appRoot,
  path: "/",
  component: Home,
});

const marketRoute = new Route({
  getParentRoute: () => appRoot,
  path: "/market",
  component: Market,
});

const billboardRoute = new Route({
  getParentRoute: () => appRoot,
  path: "/billboard",
  component: Billboard,
});

const messagesRoute = new Route({
  getParentRoute: () => appRoot,
  path: "/messages",
  component: Messages,
});

const profileRoute = new Route({
  getParentRoute: () => appRoot,
  path: "/profile",
  component: Profile,
});

const savedRoute = new Route({
  getParentRoute: () => appRoot,
  path: "/saved",
  component: Saved,
});

const workshopRoute = new Route({
  getParentRoute: () => appRoot,
  path: "/workshop",
  component: Workshop,
});

const productsRoute = new Route({
  getParentRoute: () => marketRoute,
  path: "products",
  component: Products,
});

const servicesRoute = new Route({
  getParentRoute: () => marketRoute,
  path: "services",
  component: Services,
});

const takaRoute = new Route({
  getParentRoute: () => marketRoute,
  path: "taka",
  component: Taka,
});

const authRoot = createRootRoute({});

const signInRoute = new Route({
  getParentRoute: () => authRoot,
  path: "/sign-in",
  component: SignIn,
});

const signUpRoute = new Route({
  getParentRoute: () => authRoot,
  path: "/sign-up",
  component: SignUp,
});

const authTree = authRoot.addChildren([signInRoute, signUpRoute]);
const appTree = appRoot.addChildren([
  homeRoute,
  marketRoute.addChildren([productsRoute, servicesRoute, takaRoute]),
  billboardRoute,
  messagesRoute,
  profileRoute,
  savedRoute,
  workshopRoute,
]);

console.log("authTree.children:", authTree.children);
console.log("appTree.children :", appTree.children);

const rootRoute = createRootRoute({});

export const router = createRouter({
  routeTree: rootRoute.addChildren([...authTree.children, ...appTree.children]),
});



declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
