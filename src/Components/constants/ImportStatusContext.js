import React, { createContext, useEffect, useState } from "react";
import { getIntegrationData } from "../../pages/Ecommerce/Integration/IntegerationService";
import { toast } from "react-toastify";

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
    List_Price: true,
    MAP_Price: true,
    Net_Cost: true,
    Pricing_Category: true,
    Quarterly_Rebate: false,
    Annual_Rebate: false,
    Shipping_Cost: true,
    Shipping_Method: true,
    Shipping_Depth: false,
    Shipping_Weight: false,
    Shipping_Width: false,
    ProfitMargin: true,
  });

  const [pageSize, setPageSize] = useState(10);

  const [integerationData, setIntegerationData] = useState();

  const [selectedIntegeration, setSelectedIntegeration] = useState();

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
    selectedIntegeration,
    setSelectedIntegeration,
    integerationData,
    setIntegerationData,
  };

  const updateImportStatus = (status) => {
    setImportStatus(status);
  };

  return (
    <ImportStatusContext.Provider
      value={{
        importStatus,
        updateImportStatus,
        sharedState,
      }}
    >
      {children}
    </ImportStatusContext.Provider>
  );
};
