import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";

const TasksList = lazy(() => import("@/pages/tasks-list"));
const Analytics = lazy(() => import("@/pages/analytics"));
const About = lazy(() => import("@/pages/about"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TasksList />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
