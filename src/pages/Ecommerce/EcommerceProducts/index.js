import React, { useEffect, useState, useMemo, useContext } from "react";

import {
  Container,
  Row,
  Label,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Spinner,
  Button,
  UncontrolledCollapse,
  Card,
  CardBody,
  Collapse,
} from "reactstrap";

import "nouislider/distribute/nouislider.css";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllProducts,
  getProducts,
  set_selected_products,
} from "./ProductsService";
import {
  getBrands,
  getPricingDataByBrand,
  getProductsByStatus,
  resetProductsData,
  updateFieldAkeneo,
} from "./FiltersService";
import Switch from "react-switch";
import Columns from "./Table_Columns";
import { ImportStatusContext } from "../../../Components/constants/ImportStatusContext";
import {
  getIntegrationData,
  updateStatus,
} from "../Integration/IntegerationService";

const EcommerceProducts = () => {
  const [productList, setProductList] = useState([]);

  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);

  const [brandsData, setBrandsData] = useState([]);

  const [btnLock, setBtnLock] = useState(false);

  const [toggleManager, settoggleManager] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [akeneoSlectedProducts, setAkeneoSelectedProducts] = useState([]);

  const {
    importStatus,
    updateImportStatus,
    sharedState,
    updateIntegerationData,
  } = useContext(ImportStatusContext);

  const {
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
    setViewColumns,
    ViewColumns,
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
  } = sharedState;

  console.log(integerationData);

  const handleToggleChange = async (checked) => {
    setToggleValue(checked);
    setPriceToggleValue(false);

    const data = JSON.stringify({
      grant_type: "password",
      client_id: selectedIntegeration?.clientId,
      client_secret: selectedIntegeration?.secret,
      username: selectedIntegeration?.userName,
      password: selectedIntegeration?.password,
    });

    const response = await getAllProducts(
      currentPage,
      pageSize,
      search,
      selectedBrand,
      selectedPricing,
      checked,
      false,
      data
    );
    if (response) {
      setProductList(response?.results);
      setTotalCount(parseInt(response?.totalResults));
    } else {
      setLoader(false);
    }
  };
  const handleTogglePriceChange = async (checked) => {
    setPriceToggleValue(checked);
    setToggleValue(false);

    const data = JSON.stringify({
      grant_type: "password",
      client_id: selectedIntegeration?.clientId,
      client_secret: selectedIntegeration?.secret,
      username: selectedIntegeration?.userName,
      password: selectedIntegeration?.password,
    });
    const response = await getAllProducts(
      currentPage,
      pageSize,
      search,
      selectedBrand,
      selectedPricing,
      false,
      checked,
      data
    );
    if (response) {
      setProductList(response?.results);
      setTotalCount(parseInt(response?.totalResults));
    } else {
      setLoader(false);
    }
  };

  const getData = async () => {
    setLoader(true);

    const responseInt = await getIntegrationData();

    const selectedObject = responseInt.find((i) => i.status === true);
    if (selectedObject) {
      setSelectedIntegeration(selectedObject);
    }

    if (responseInt) {
      setIntegerationData(responseInt);
    }

    const data = JSON.stringify({
      grant_type: "password",
      client_id: selectedObject?.clientId,
      client_secret: selectedObject?.secret,
      username: selectedObject?.userName,
      password: selectedObject?.password,
      domain: selectedObject?.domain,
    });

    const brandsResponse = await getBrands(data);
    if (brandsResponse.success) {
      setBrandsData(brandsResponse.data);
    } else {
      setLoader(false);
    }

    const response = await getAllProducts(
      currentPage,
      pageSize,
      search,
      selectedBrand,
      selectedPricing,
      toggleValue,
      priceToggleValue,
      data
    );

    if (response) {
      setProductList(response?.results);
      setTotalCount(parseInt(response?.totalResults));
    } else {
      toast.success("No product found", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoader(false);
    }

    setLoader(false);
  };

  const handleSelectPageSize = (pageSize) => {
    setPageSize(pageSize);
  };

  const handleBrandChange = async (e) => {
    const brandId = e.target.value;
    setSelectedBrand(e.target.value);
    setSelectedPricing("");
    const response = await getPricingDataByBrand(
      brandId,
      selectedIntegeration?.secret
    );
    if (response) {
      setPricingCategory(response);
    } else {
      setPricingCategory([]);
    }
  };

  useEffect(() => {
    getData();
    getproductsByStatus();
  }, [currentPage, pageSize]);

  const handleCheckboxChange = (columnKey) => {
    setViewColumns((prevColumns) => ({
      ...prevColumns,
      [columnKey]: !prevColumns[columnKey],
    }));
  };

  const toggleManagerModal = () => {
    settoggleManager(!toggleManager);
  };

  const handleContactDialogClose = () => {
    settoggleManager(false);
  };

  const toggleImportManagerModal = () => {
    setImportModal(!importModal);
  };

  const handleImportContactDialogClose = () => {
    setImportModal(false);
  };
  const toggleCollapse = () => {
    setFilterIsOpen(!isFilterOpen);
  };
  const toggleViewCollapse = () => {
    setIsViewOpen(!isViewOpen);
  };

  const updateFieldsInAkeneo = async () => {
    setBtnLock(true);
    console.log(akeneoSlectedProducts);

    const finalData = {
      products: akeneoSlectedProducts,
    };
    if (akeneoSlectedProducts?.length !== 0) {
      const data = JSON.stringify({
        grant_type: "password",
        client_id: selectedIntegeration?.clientId,
        client_secret: selectedIntegeration?.secret,
        username: selectedIntegeration?.userName,
        password: selectedIntegeration?.password,
        domain: selectedIntegeration?.domain,
      });

      const response = await updateFieldAkeneo(finalData, data);
      if (response) {
        settoggleManager(false);
        resetProducts();

        toast.success("Products updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setBtnLock(false);
      } else {
        setBtnLock(false);
      }
    } else {
      toast.error("No Product Selected", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setBtnLock(false);
      settoggleManager(false);
    }
  };

  const importDataFromAkeneo = async () => {
    updateImportStatus(true);
    handleImportContactDialogClose();
    try {
      const data = JSON.stringify({
        grant_type: "password",
        client_id: selectedIntegeration?.clientId,
        client_secret: selectedIntegeration?.secret,
        username: selectedIntegeration?.userName,
        password: selectedIntegeration?.password,
        domain: selectedIntegeration?.domain,
      });

      const response = await getProducts(data);
      if (response) {
        getData();
        toast.success(response.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        updateImportStatus(false); // Set to false only when the response is successful
      }
    } catch (error) {
      console.error(error);
      updateImportStatus(false); // Set to false in case of error
    }
  };
  const getproductsByStatus = async () => {
    const response = await getProductsByStatus();
    if (response) {
      setAkeneoSelectedProducts(response);
    }
  };

  const resetProducts = async () => {
    setAkeneoSelectedProducts([]);
    setAllproductsCheck(false);
    setProductList((prev) => {
      const updatedList = prev.map((product) => {
        return { ...product, akeneoStatus: false };
      });
      return updatedList;
    });
    const response = await resetProductsData();
    if (response) {
      console.log(response);
    }
  };

  const resetSearchData = async () => {
    setLoader(true);
    setSelectedBrand("");
    setSelectedPricing("");
    document.getElementById("brand").selectedIndex = 0;
    document.getElementById("price").selectedIndex = 0;
    setPricingCategory([]);

    const data = JSON.stringify({
      grant_type: "password",
      client_id: selectedIntegeration?.clientId,
      client_secret: selectedIntegeration?.secret,
      username: selectedIntegeration?.userName,
      password: selectedIntegeration?.password,
      domain: selectedIntegeration?.domain,
    });
    const response = await getAllProducts(
      currentPage,
      pageSize,
      search,
      "",
      "",
      toggleValue,
      "",
      data
    );

    if (response) {
      setProductList(response?.results);
      setTotalCount(parseInt(response?.totalResults));
    } else {
      setLoader(false);
    }
    setLoader(false);
  };

  const { columnsData } = Columns({
    setProductList,
    setAkeneoSelectedProducts,
    search,
    selectedBrand,
    selectedPricing,
    toggleValue,
    priceToggleValue,
  });

  const filteredColumns = useMemo(() => {
    return columnsData?.filter((column) => ViewColumns[column.accessor]);
  }, [ViewColumns]);

  const handleAllCheckBox = async (e) => {
    setAllproductsCheck(e.target.checked);
    const response = await set_selected_products(
      e.target.checked,
      search,
      selectedBrand,
      selectedPricing,
      toggleValue,
      priceToggleValue
    );

    setProductList((prevProductList) => {
      return prevProductList.map((product) => {
        return {
          ...product,
          akeneoStatus: e.target.checked,
        };
      });
    });

    if (response) {
      if (e.target.checked) {
        const updatedProducts = response?.map((i) => {
          return {
            id: i.id,
            identifier: i.SKU,
            price: i.Price ? i.Price : 0,
            compare_at_price: i.Compare_at_price ? i.Compare_at_price : 0,
            Free_Shipping: Boolean(i.isShipping_Cost),
          };
        });

        setAkeneoSelectedProducts(updatedProducts);
      } else {
        setAkeneoSelectedProducts([]);
      }
    }
  };

  const selectSource = async (event) => {
    const selectedValue = event.target.value;

    // Find the selected object from the integerationData array
    const selectedObject = integerationData.find(
      (i) => i.clientId === selectedValue
    );

    const response = await updateStatus({
      clientId: selectedValue,
      status: true,
    });
    setSelectedIntegeration(selectedObject);
    getData();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer closeButton={false} limit={1} />
        <Container fluid>
          <BreadCrumb title="Products" pageTitle="" />
          <Row>
            <div className="col-xl-12 col-lg-12">
              <div>
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex mb-3">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between ">
                          <div className="d-flex gap-3">
                            <div className="search-box  d-inline-block ">
                              <input
                                id="search-bar-0"
                                type="text"
                                className="form-control search /"
                                placeholder="Search Product..."
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    setCurrentPage(1);
                                    getData();
                                  }
                                }}
                              />
                              <i className="bx bx-search-alt search-icon"></i>
                            </div>
                            <div>
                              <select
                                name="brand"
                                id="brand"
                                className="form-control"
                                style={{ width: "unset" }}
                                onChange={selectSource}
                                value={
                                  selectedIntegeration
                                    ? selectedIntegeration.clientId
                                    : ""
                                }
                              >
                                {integerationData?.map((i) => {
                                  return (
                                    <option value={i.clientId} key={i.id}>
                                      {i.userName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="d-flex gap-3">
                            <button
                              type="button"
                              onClick={() => toggleImportManagerModal()}
                              className="btn btn-success"
                              disabled={importStatus}
                            >
                              {importStatus
                                ? "Importing data..."
                                : "Import Data"}
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleManagerModal()}
                              className="btn btn-success"
                            >
                              Update in akeneo
                            </button>
                          </div>
                        </div>
                        <div className="d-flex gap-3 pt-3">
                          <Button
                            color="primary"
                            onClick={toggleCollapse}
                            style={{
                              marginBottom: "1rem",
                            }}
                          >
                            Filters
                          </Button>
                          <Button
                            color="primary"
                            onClick={toggleViewCollapse}
                            style={{
                              marginBottom: "1rem",
                            }}
                          >
                            Views
                          </Button>
                        </div>
                        <Collapse isOpen={isFilterOpen}>
                          <Card>
                            <CardBody>
                              <div className="d-flex gap-3">
                                <div>
                                  <select
                                    name="brand"
                                    id="brand"
                                    className="form-control"
                                    style={{ width: "unset" }}
                                    onChange={handleBrandChange}
                                    value={selectedBrand}
                                  >
                                    <option value="">Select a brand</option>
                                    {brandsData?.map((i) => {
                                      return (
                                        <option value={i.id} key={i.id}>
                                          {i.label}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                {pricingCategory?.length !== 0 && (
                                  <div>
                                    <select
                                      name="price"
                                      id="price"
                                      className="form-control"
                                      value={selectedPricing}
                                      onChange={(e) => {
                                        setSelectedPricing(e.target.value);
                                      }}
                                    >
                                      <option value="">
                                        Select a Category
                                      </option>
                                      {pricingCategory?.map((i) => {
                                        return (
                                          <option
                                            value={i.category}
                                            key={i.category}
                                          >
                                            {i.category}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                )}

                                <button
                                  type="button"
                                  onClick={() => {
                                    getData();
                                  }}
                                  className="btn btn-success"
                                >
                                  Search
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    resetSearchData();
                                  }}
                                  className="btn btn-success btn_edit_style"
                                >
                                  Reset
                                </button>
                              </div>
                              <div className="price___section pt-4">
                                <Label>Products with no prices</Label>
                                <Switch
                                  checked={toggleValue}
                                  onChange={handleToggleChange}
                                  onColor="#86d3ff"
                                  onHandleColor="#2693e6"
                                  handleDiameter={20}
                                  uncheckedIcon={false}
                                  checkedIcon={false}
                                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                  activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                  height={15}
                                  width={40}
                                  className="react-switch"
                                />
                              </div>
                              <div className="price___section pt-4">
                                <Label>Products with prices</Label>
                                <Switch
                                  checked={priceToggleValue}
                                  onChange={handleTogglePriceChange}
                                  onColor="#86d3ff"
                                  onHandleColor="#2693e6"
                                  handleDiameter={20}
                                  uncheckedIcon={false}
                                  checkedIcon={false}
                                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                  activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                  height={15}
                                  width={40}
                                  className="react-switch"
                                />
                              </div>
                            </CardBody>
                          </Card>
                        </Collapse>

                        <Collapse isOpen={isViewOpen}>
                          <Card>
                            <CardBody>
                              <div className="d-flex  align-items-center pt-4 flex-wrap gap-4">
                                {columnsData?.map((column) => (
                                  <div
                                    key={column.accessor}
                                    className="d-flex gap-2 align-items-baseline"
                                  >
                                    <input
                                      className="check_box_input "
                                      type="checkbox"
                                      checked={ViewColumns[column.accessor]}
                                      onChange={() =>
                                        handleCheckboxChange(column.accessor)
                                      }
                                    />
                                    <label> {column.Header}</label>
                                  </div>
                                ))}
                              </div>
                            </CardBody>
                          </Card>
                        </Collapse>

                        <div className="pt-3 d-flex align-items-center gap-2">
                          <button
                            type="button"
                            onClick={() => resetProducts()}
                            className="btn btn-success btn_edit_style"
                          >
                            Reset
                          </button>
                          <h6>
                            Selected Products {akeneoSlectedProducts?.length}
                          </h6>
                        </div>

                        <div className="d-flex align-items-center pt-4 gap-2">
                          <input
                            className="check_box_input"
                            type="checkbox"
                            checked={selectAllProductCheck}
                            onChange={(e) => handleAllCheckBox(e)}
                          />
                          <h6 className="m-0">Select All</h6>
                        </div>

                        {/* <Link to="/add-product" className="text-decoration-underline">
                          Add New Product
                        </Link> */}
                      </div>
                      <div className="flex-shrink-0">
                        {/* <button className="btn btn-primary btn-sm me-2">
                          Import/Update
                        </button> */}
                        {/* <button className="btn btn-warning btn-sm">
                          Edit Columns
                        </button> */}
                      </div>
                    </div>
                    <div className="row align-items-center border-0 d-flex justify-content-between">
                      <div className="filter-choices-input col-xl-3 col-lg-3 col-md-3 col-sm-6"></div>

                      <div className="filter-choices-input col-xl-2 col-lg-3 col-md-3 col-sm-6"></div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {loader ? (
                      <div
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          marginTop: "50px",
                          marginBottom: "50px",
                          width: "100%",
                        }}
                      >
                        <Spinner animation="border " role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : productList?.length > 0 ? (
                      <TableContainer
                        columns={filteredColumns}
                        data={productList?.map((product) => {
                          return {
                            ...product, // Spread the existing properties of the product
                            Price: Number.parseFloat(product.Price).toFixed(2), // Replace the price with the updated value
                          };
                        })}
                        isGlobalFilter={false}
                        isAddUserList={false}
                        isAddOptions={false}
                        isGlobalSearch={true}
                        customPageSize={10}
                        divClass="table-responsive mb-1"
                        tableClass="mb-0 align-middle table-borderless"
                        theadClass="table-light text-muted"
                        isProductsFilter={true}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalCount={totalCount}
                        SearchPlaceholder="Search Product..."
                        handleSelectPageSize={handleSelectPageSize}
                        hover={true}
                        curPageSize={pageSize}
                        setPageSize={setPageSize}
                        navLink={"/view-product/"}
                        rowRenderer={(row) => ({
                          ...row,
                          price: Number.parseFloat(row.Price).toFixed(2),
                        })}
                      />
                    ) : (
                      <div className="py-4 text-center">
                        <div>
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#405189,secondary:#0ab39c"
                            style={{ width: "72px", height: "72px" }}
                          ></lord-icon>
                        </div>

                        <div className="mt-4">
                          <h5>Sorry! No Result Found</h5>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>

      <Modal
        isOpen={toggleManager}
        role="dialog"
        autoFocus={true}
        centered
        id="addBrandModal"
        toggle={toggleManager}
      >
        <form>
          <ModalHeader
            toggle={() => {
              handleContactDialogClose();
            }}
          ></ModalHeader>
          <ModalBody>
            <Row>
              {" "}
              <h4>
                Are you sure you want to update the selected products in akeneo!
              </h4>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                handleContactDialogClose();
              }}
            >
              No
            </button>

            <button
              type="button"
              onClick={(e) => updateFieldsInAkeneo(e)}
              className="btn btn-success"
              disabled={btnLock}
            >
              Yes
            </button>
          </ModalFooter>
        </form>
      </Modal>
      <Modal
        isOpen={importModal}
        role="dialog"
        autoFocus={true}
        centered
        id="addBrandModal"
        toggle={importModal}
      >
        <form>
          <ModalHeader
            toggle={() => {
              handleImportContactDialogClose();
            }}
          ></ModalHeader>
          <ModalBody>
            <Row>
              {" "}
              <h4>Are you sure you want to import products from akeneo!</h4>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                handleImportContactDialogClose();
              }}
            >
              No
            </button>

            <button
              type="button"
              onClick={(e) => importDataFromAkeneo(e)}
              className="btn btn-success"
              disabled={importStatus}
            >
              Yes
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default EcommerceProducts;
