import React from "react";
import { Navigate } from "react-router-dom";

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceAddProduct";
import VendorProducts from "../pages/Ecommerce/Vendor";
import VenderPayment from "../pages/Ecommerce/Vendor/VenderPayment";
import VendorContacts from "../pages/Ecommerce/Vendor/VendorContacts";
import VenderPriceLists from "../pages/Ecommerce/Vendor/VenderPriceLists";
import ManageVendors from "../pages/Ecommerce/Vendor/ManageVendors";
import IntegrationList from "../pages/Ecommerce/Integration/IntegrationList";
import CompetitionProduct from "../pages/Ecommerce/EcommerceProducts/CompetitionProduct";
import ManageBrands from "../pages/Ecommerce/Brands/ManageBrands";
import ViewBrands from "../pages/Ecommerce/Brands/ViewBrands";
import ManageShippingRules from "../pages/Ecommerce/ShipingRules/ManageShippingRules";
import ManageCompetition from "../pages/Ecommerce/Competition/ManageCompetiton";

const authProtectedRoutes = [
  { path: "/products", component: <EcommerceProducts /> },
  { path: "/view-product/:sku", component: <EcommerceAddProduct /> },
  { path: "/vendor", component: <VendorProducts /> },
  { path: "/vendor-payment", component: <VenderPayment /> },
  { path: "/vendor-contacts", component: <VendorContacts /> },
  { path: "/vendor-price", component: <VenderPriceLists /> },
  { path: "/manage-vendors", component: <ManageVendors /> },
  { path: "/integration", component: <IntegrationList /> },
  { path: "/competition-section", component: <ManageCompetition /> },
  { path: "/brands", component: <ManageBrands /> },
  { path: "/shippingRules", component: <ManageShippingRules /> },

  { path: "/view_brands/:id", component: <ViewBrands /> },
  {
    path: "/",
    exact: true,
    component: <EcommerceProducts />,
  },
  { path: "*", component: <Navigate to="/products" /> },
];

const publicRoutes = [
  // Authentication Page
];

export { authProtectedRoutes, publicRoutes };
