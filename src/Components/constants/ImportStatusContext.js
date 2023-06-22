import React, { createContext, useState } from "react";

export const ImportStatusContext = createContext();

export const ImportStatusProvider = ({ children }) => {
  const [importStatus, setImportStatus] = useState(
    localStorage.getItem("importStatus") === "true"
  );

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPricing, setSelectedPricing] = useState("");
  const [toggleValue, setToggleValue] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [priceToggleValue, setPriceToggleValue] = useState(false);
  const [pricingCategory, setPricingCategory] = useState([]);
  const [isFilterOpen, setFilterIsOpen] = useState(false);
  const [selectAllProductCheck, setAllproductsCheck] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ViewColumns, setViewColumns] = useState({
    Select: true,
    actions: true,
    undefined: true,
    SKU: true,
    Product_Name: true,
    Price: true,
    Brand: true,
    Product_Type: false,
    List_Price: false,
    MAP_Price: false,
    Net_Cost: false,
    Pricing_Category: false,
    Quarterly_Rebate: false,
    Annual_Rebate: false,
    Shipping_Cost: false,
    Shipping_Method: false,
    Shipping_Depth: false,
    Shipping_Weight: false,
    Shipping_Width: false,
  });

  const [pageSize, setPageSize] = useState(10);

  const sharedState = {
    selectedBrand,
    setSelectedBrand,
    selectedPricing,
    setSelectedPricing,
    toggleValue,
    setToggleValue,
    priceToggleValue,
    setPriceToggleValue,
    pricingCategory,
    setPricingCategory,
    isFilterOpen,
    setFilterIsOpen,
    selectAllProductCheck,
    setAllproductsCheck,
    ViewColumns,
    setViewColumns,
    setPageSize,
    pageSize,
    setTotalCount,
    totalCount,
    currentPage,
    setCurrentPage,
    isViewOpen,
    setIsViewOpen,
  };

  const updateImportStatus = (status) => {
    setImportStatus(status);
  };

  return (
    <ImportStatusContext.Provider
      value={{ importStatus, updateImportStatus, sharedState }}
    >
      {children}
    </ImportStatusContext.Provider>
  );
};
