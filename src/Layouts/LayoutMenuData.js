import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isProduct, setIsProduct] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [isFinance, setIsFinance] = useState(false);
  const [isIntegration, setIsIntegration] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isbrands, setIsBrands] = useState(false);
  const [isShipping, setIsShipping] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Product");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Product") {
      setIsProduct(false);
    }
    if (iscurrentState !== "Vendor") {
      setIsVendor(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Order") {
      setIsOrder(false);
    }
    if (iscurrentState !== "Sale") {
      setIsSale(false);
    }
    if (iscurrentState !== "Finance") {
      setIsFinance(false);
    }
    if (iscurrentState !== "Integration") {
      setIsIntegration(false);
    }
    if (iscurrentState !== "User") {
      setIsUser(false);
    }
    if (iscurrentState !== "Brands") {
      setIsBrands(false);
    }
    if (iscurrentState !== "Shipping") {
      setIsShipping(false);
    }
  }, [
    history,
    iscurrentState,
    isProduct,
    isApps,
    isVendor,
    isOrder,
    isSale,
    isFinance,
    isIntegration,
    isUser,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "products",
      label: "Products",
      link: "#",
      click: function (e) {
        e.preventDefault();
        setIsProduct(!isProduct);
        setIscurrentState("Product");
        updateIconSidebar(e);
      },
      stateVariables: isProduct,
      subItems: [
        {
          id: "products",
          label: "products",
          link: "/products",
          parentId: "finace",
        },
        {
          id: "competition",
          label: "Competition Section",
          link: "/competition-section",
          parentId: "finace",
        },
      ],
    },
    {
      id: "vendors",
      label: "Vendors",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isVendor);
        setIscurrentState("Vendor");
        updateIconSidebar(e);
      },
      stateVariables: isVendor,
      subItems: [
        {
          id: "vendors",
          label: "Vendors",
          link: "/vendor",
          parentId: "finace",
        },
        {
          id: "manage-vendors",
          label: "Manage Vendors",
          link: "/manage-vendors",
          parentId: "finace",
        },
        {
          id: "contacts",
          label: "Contacts",
          link: "/vendor-contacts",
          parentId: "finace",
        },
        {
          id: "payment-instructions",
          label: "Payment Instructions",
          link: "/vendor-payment",
          parentId: "finace",
        },
        {
          id: "price-lists",
          label: "Price Lists",
          link: "/vendor-price",
          parentId: "finace",
        },
      ],
    },

    {
      label: "pages",
      isHeader: true,
    },
    {
      id: "orders",
      label: "Orders",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isOrder);
        setIscurrentState("Order");
        updateIconSidebar(e);
      },
      stateVariables: isOrder,
    },

    {
      id: "sales",
      label: "Sales",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isSale);
        setIscurrentState("Sale");
        updateIconSidebar(e);
      },
      stateVariables: isSale,
    },
    {
      id: "integration",
      label: "Integration",
      link: "/integration",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isIntegration);
        setIscurrentState("Integration");
        updateIconSidebar(e);
      },
      stateVariables: isIntegration,
    },
    {
      id: "users",
      label: "Users",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isUser);
        setIscurrentState("User");
        updateIconSidebar(e);
      },
      stateVariables: isUser,
    },
    {
      id: "Brands",
      label: "Brands",
      link: "/brands",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isbrands);
        setIscurrentState("Brands");
        updateIconSidebar(e);
      },
      stateVariables: isbrands,
    },
    {
      id: "Shipping",
      label: "Shipping Rules",
      link: "/shippingRules",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isShipping);
        setIscurrentState("Shipping");
        updateIconSidebar(e);
      },
      stateVariables: isShipping,
    },
    {
      id: "apps",
      label: "Apps",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: 1,
          label: "Products",
          link: "/apps-ecommerce-products",
          parentId: "apps",
        },
        {
          id: 2,
          label: "Product Details",
          link: "/apps-ecommerce-product-details",
          parentId: "apps",
        },
        {
          id: 3,
          label: "Create Product",
          link: "/add-product",
          parentId: "apps",
        },
        {
          id: 4,
          label: "Orders",
          link: "/apps-ecommerce-orders",
          parentId: "apps",
        },
        {
          id: 5,
          label: "Order Details",
          link: "/apps-ecommerce-order-details",
          parentId: "apps",
        },
        {
          id: 6,
          label: "Customers",
          link: "/apps-ecommerce-customers",
          parentId: "apps",
        },
        {
          id: 7,
          label: "Shopping Cart",
          link: "/apps-ecommerce-cart",
          parentId: "apps",
        },
        {
          id: 8,
          label: "Checkout",
          link: "/apps-ecommerce-checkout",
          parentId: "apps",
        },
        {
          id: 9,
          label: "Sellers",
          link: "/apps-ecommerce-sellers",
          parentId: "apps",
        },
        {
          id: 10,
          label: "Seller Details",
          link: "/apps-ecommerce-seller-details",
          parentId: "apps",
        },
      ],
    },
    {
      id: "finance",
      label: "Finaces",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isFinance);
        setIscurrentState("Finance");
        updateIconSidebar(e);
      },
      stateVariables: isFinance,
      subItems: [
        {
          id: "finace-sales-tax",
          label: "Sales Tax",
          link: "/#",
          parentId: "finace",
        },
        {
          id: "finace-vendor-rebates",
          label: "Vendor Rebates",
          link: "/#",
          parentId: "finace",
        },
        {
          id: "finace-reports",
          label: "Reports",
          link: "/#",
          parentId: "finace",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
