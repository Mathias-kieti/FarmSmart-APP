import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import RootLayout, { NotFound } from "@/routes/__root";
import CropAdvisor from "@/routes/crop-advisor";
import Dashboard from "@/routes/index";
import FarmPlan from "@/routes/farm-plan";
import Learn from "@/routes/learn";
import Marketplace from "@/routes/marketplace";
import Markets from "@/routes/markets";
import Orders from "@/routes/orders";
import Profile from "@/routes/profile";
import Sell from "@/routes/sell";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "crop-advisor", element: <CropAdvisor /> },
      { path: "farm-plan", element: <FarmPlan /> },
      { path: "markets", element: <Markets /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "sell", element: <Sell /> },
      { path: "orders", element: <Orders /> },
      { path: "learn", element: <Learn /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

