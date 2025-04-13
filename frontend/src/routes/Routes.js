import WantedDetailPage from "@/pages/Details";
import WantedListPage from "@/pages/Home";
import { wantedListLoader } from "@/data/data";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: WantedListPage,
    loader: wantedListLoader,
  },
  // {
  //   path: "wanted/:id",
  //   Component: WantedDetailPage,
  // },
]);
