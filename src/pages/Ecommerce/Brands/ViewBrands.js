import React, { useEffect, useMemo, useState } from "react";
import TableCommonContainer from "../../../Components/Common/TableCommonContainer";
import { ToastContainer } from "react-toastify";
import {
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

import BrandsTableContainer from "../../../Components/Common/BrandsTableContainer";
import { getBrandsData, updateCategory } from "./BrandsService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnnualRowData from "./AnnualRowData";
import QuarterlyRowData from "./QuarterlyRowData";
import AdditionalFee from "./AdditionalFee";
import BrandsSetting from "./BrandsSetting";
import { getIntegrationData } from "../Integration/IntegerationService";

function ViewBrands() {
  const { id } = useParams();
  const [PricingList, setPricingList] = useState([]);
  const [toggleManagerVender, settoggleManagerVenderModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [mapActiveTab, setMapActiveTab] = useState("1");
  const [rulesActiveTab, setRulesActiveTab] = useState("1");
  const [selectedSource, setSelectedSource] = useState("");
  const [aditionalFee, setAdditionalFee] = useState([
    {
      feeName: "",
      price: "",
      percentage: "",
    },
  ]);
  const [querterRowData, setQuarterRowData] = useState([
    {
      id: "",
      from: "",
      until: "",
      percent: "",
    },
  ]);
  const [annualRowData, setAnnualRowData] = useState([
    {
      id: "",
      from: "",
      until: "",
      percent: "",
    },
  ]);
  const [newValidation, setNewValidation] = useState({
    dealerDiscount: "",
    pricing_category: "",
    MAP_Policy: "",
    minimumMargin: "",
  });

  const [brandData, setBrandData] = useState({
    brandId: id,
    dealerDiscount: "",
    pricing_category: "",
    MAP_Policy: "",
    isAkeneo_MapDiscount: "",
    isAkeneo_NetCost_Discount: "",
    isShipping_Cost: "",
    Dealer_MapPrice: "",
    is_Quarterly_Rebate: "",
    is_Quarterly_Volume_Based_Rebate: "",
    Quarterly_Rebate_Percentage: "",
    is_Annual_Rebate: "",
    is_Annual_Volume_Based_Rebate: "",
    Annual_Rebate_Percentage: "",
    AdditionalFee: [],
    isVendorRules: "",
    vendorRulePrice: "",
    vendorRulePrice_Percentage: "",
    TotalAdditionalFee: "",
    minimumMargin: "",
    maxMargin: "",
    isRoundDown: false,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const responseInt = await getIntegrationData();
    const selectedObject = responseInt.find((i) => i.status === true);
    setSelectedSource(selectedObject.secret);
    const response = await getBrandsData(id, selectedObject.secret);
    if (response) {
      setPricingList(response);
    }
  };

  const toggleMapTab = (tabId) => {
    if (mapActiveTab !== tabId) {
      setMapActiveTab(tabId);
    }

    if (tabId === "1") {
      setBrandData({
        ...brandData,
        isAkeneo_MapDiscount: "true",
      });
    } else {
      setBrandData({
        ...brandData,
        isAkeneo_MapDiscount: "false",
      });
    }
  };

  const toggleRulesTab = (tabId) => {
    if (rulesActiveTab !== tabId) {
      setRulesActiveTab(tabId);
    }

    if (tabId === "1") {
      setBrandData({
        ...brandData,
        isVendorRules: "false",
      });
    } else {
      setBrandData({
        ...brandData,
        isVendorRules: "true",
      });
    }
  };

  const toggleTab = (tabId) => {
    if (activeTab !== tabId) {
      setActiveTab(tabId);
    }

    if (tabId === "1") {
      setBrandData({
        ...brandData,
        isAkeneo_NetCost_Discount: "true",
      });
    } else {
      setBrandData({
        ...brandData,
        isAkeneo_NetCost_Discount: "false",
      });
    }
  };

  const toggleManagerVendorModal = (row) => {
    settoggleManagerVenderModal(!toggleManagerVender);
    console.log(row);
    const newObject = {
      brandId: id,
      dealerDiscount: row?.original?.Net_Cost_percentage,
      pricing_category: row?.original?.category,
      MAP_Policy: row?.original?.MAP_Policy,
      isAkeneo_MapDiscount: row?.original?.isAkeneo_MapDiscount,
      isAkeneo_NetCost_Discount: row?.original?.isAkeneo_NetCost_Discount,
      isShipping_Cost: row?.original?.isShipping_Cost,
      Dealer_MapPrice: row?.original?.Map_Price_percentage,
      is_Quarterly_Rebate: row?.original?.is_Quarterly_Rebate,
      is_Quarterly_Volume_Based_Rebate:
        row?.original?.is_Quarterly_Volume_Based_Rebate,
      Quarterly_Rebate_Percentage: row?.original?.Quarterly_Rebate_Percentage,
      is_Annual_Rebate: row?.original?.is_Annual_Rebate,
      is_Annual_Volume_Based_Rebate:
        row?.original?.is_Annual_Volume_Based_Rebate,
      Annual_Rebate_Percentage: row?.original?.Annual_Rebate_Percentage,
      isVendorRules: row?.original?.isVendorRules,
      vendorRulePrice: row?.original?.vendorRulePrice,
      vendorRulePrice_Percentage: row?.original?.vendorRulePrice_Percentage,
      minimumMargin: row?.original?.minimumMargin,
      TotalAdditionalFee: row?.original?.TotalAdditionalFee,
      maxMargin: row?.original?.maxMargin,
      isRoundDown: row?.original?.isRoundDown,
    };

    setAdditionalFee(row?.original?.AdditionalFee);

    if (row?.original?.isAkeneo_NetCost_Discount === "true") {
      toggleTab("1");
    } else {
      toggleTab("2");
    }
    if (row?.original?.isVendorRules === "false") {
      toggleRulesTab("1");
    } else {
      toggleRulesTab("2");
    }
    if (row?.original?.isAkeneo_MapDiscount === "true") {
      toggleMapTab("1");
    } else {
      toggleMapTab("2");
    }

    console.log(newObject);
    setBrandData(newObject);
  };
  const handleVenderContactDialogClose = () => {
    settoggleManagerVenderModal(false);
  };

  const columns = useMemo(() => {
    let arr = [];
    arr.push({
      Header: "Products Pricing category",
      accessor: "category",
      filterable: false,
    });
    arr.push({
      Header: "Map Price Discount",
      accessor: "Map_Price_percentage",
      filterable: false,
    });
    arr.push({
      Header: "# of products",
      accessor: "count",
      filterable: false,
    });
    arr.push({
      Header: "Net Cost Discount",
      accessor: "Net_Cost_percentage",
      filterable: false,
    });

    arr.push({
      Header: "Actions",
      Cell: ({ row }) => (
        <button
          type="button"
          onClick={() => toggleManagerVendorModal(row)}
          className="btn btn-success"
        >
          Edit
        </button>
      ),
    });

    return arr;
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    const requiredFields = [
      { field: "dealerDiscount", message: "Discount is required" },
      { field: "pricing_category", message: "Category is required" },
      { field: "minimumMargin", message: "Minimum margin is required" },
    ];

    requiredFields.forEach(({ field, message }) => {
      if (!brandData[field]) {
        // Exclude "dealerDiscount" field requirement if isAkeneo_NetCost_Discount is true
        if (
          !(
            field === "dealerDiscount" &&
            brandData.isAkeneo_NetCost_Discount === "true"
          )
        ) {
          errors[field] = message;
        }
      }

      if (
        field === "dealerDiscount" &&
        brandData[field] &&
        !/^(?:\d+\/)*\d+$/.test(brandData[field])
      ) {
        errors[field] =
          "Invalid discount format. Please use the format 5/5/10/10 (e.g., 3/5/20/50) or a single number.";
      }
      if (
        field === "Dealer_MapPrice" &&
        brandData[field] &&
        !/^(?:\d+\/)*\d+$/.test(brandData[field])
      ) {
        errors[field] =
          "Invalid discount format. Please use the format 5/5/10/10 (e.g., 3/5/20/50) or a single number.";
      }

      if (brandData.MAP_Policy === "true" && !brandData.Dealer_MapPrice) {
        errors.MAP_Policy =
          "Map price should be provided when map policy is yes.";
      }
    });

    if (brandData.isVendorRules === "true") {
      if (
        (brandData.vendorRulePrice !== "" &&
          brandData.vendorRulePrice_Percentage !== "") ||
        (brandData.vendorRulePrice === "" &&
          brandData.vendorRulePrice_Percentage === "")
      ) {
        // Show an error or handle the error condition as needed
        console.log();
        toast.error(
          " Only one field (price or percentage) can be filled in vendor rule.",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }
    }

    //// Rows one check should be filled
    const invalidRows = aditionalFee.filter(
      (row) => row.price !== "" && row.percentage !== ""
    );

    if (invalidRows.length > 0) {
      // Show an error or handle the error condition as needed
      toast.error(
        " Only one field (price or percentage) can be filled in each row. ",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      return;
    }

    // feeName validation in array
    const isEmptyFeeName = aditionalFee.some((item) => item.feeName === "");

    if (isEmptyFeeName) {
      // Handle the validation error
      toast.error(" FeeName is required for all additional fees.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    /// calculating the total price and percentage of the addittional Fee

    const getTotal = (field) => {
      const total = aditionalFee.reduce((acc, row) => {
        const value = parseFloat(row[field]);
        return acc + (isNaN(value) ? 0 : value);
      }, 0);

      return total.toString();
    };

    const totalPercentage = getTotal("percentage");
    const totalPrice = getTotal("price");

    console.log("Total Percentage:", totalPercentage);
    console.log("Total Price:", totalPrice);

    setNewValidation(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const updatedBrandData = {
          ...brandData,
          AdditionalFee: aditionalFee,
          TotalAdditionalFeePrice: totalPrice,
          TotalAdditionalFeePercentage: totalPercentage,
          sourceId: selectedSource,
        };

        const response = await updateCategory(updatedBrandData);
        if (response) {
          getData();
          settoggleManagerVenderModal(false);
          toast.success("Prcing category successfully updated", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBrandData({
            dealerDiscount: "",
            pricing_category: "",
            brandId: id,
          });
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRowChange = (e, index, field) => {
    const updatedRowData = [...querterRowData];
    updatedRowData[index][field] = e.target.value;
    setQuarterRowData(updatedRowData);
  };
  const handleAnnualRowChange = (e, index, field) => {
    const updatedRowData = [...annualRowData];
    updatedRowData[index][field] = e.target.value;
    setAnnualRowData(updatedRowData);
  };
  const handleAdditionalRowChange = (e, index, field) => {
    const updatedRowData = [...aditionalFee];
    updatedRowData[index][field] = e.target.value;
    setAdditionalFee(updatedRowData);
  };

  const addRow = () => {
    setQuarterRowData([
      ...querterRowData,
      { id: "", from: "", until: "", percent: "" },
    ]);
  };
  const addAnualRow = () => {
    setAnnualRowData([
      ...annualRowData,
      { id: "", from: "", until: "", percent: "" },
    ]);
  };

  const deleteRow = (index) => {
    const updatedRowData = [...querterRowData];
    updatedRowData.splice(index, 1);
    setQuarterRowData(updatedRowData);
  };
  const deleteAnnualRow = (index) => {
    const updatedRowData = [...annualRowData];
    updatedRowData.splice(index, 1);
    setAnnualRowData(updatedRowData);
  };

  const addAdditionalRow = () => {
    setAdditionalFee([
      ...aditionalFee,
      { feeName: "", price: "", percentage: "" },
    ]);
  };

  const deleteAdditionalRow = (index) => {
    const updatedRowData = [...aditionalFee];
    updatedRowData.splice(index, 1);
    setAdditionalFee(updatedRowData);
  };

  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <ToastContainer closeButton={false} limit={1} />
          <Container fluid>
            {/* <BreadCrumb title="Vendor" pageTitle="" /> */}
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="col-xl-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h4>Pricing Categories</h4>
                        </div>
                      </div>
                    </div>

                    <div className="card-body pt-0">
                      {PricingList && PricingList?.length > 0 ? (
                        <BrandsTableContainer
                          columns={columns}
                          data={PricingList || []}
                          isGlobalFilter={false}
                          isAddUserList={false}
                          isAddOptions={false}
                          isGlobalSearch={true}
                          customPageSize={10}
                          divClass="table-responsive mb-1"
                          tableClass="mb-0 align-middle table-borderless"
                          theadClass="table-light text-muted"
                          isProductsFilter={true}
                          SearchPlaceholder="Search Product..."
                          navLink={""}
                          hover={true}
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
              </Col>
            </Row>
          </Container>
        </div>
        <BrandsSetting
          id={id}
          PricingList={PricingList}
          selectedSource={selectedSource}
        />
        <Modal
          isOpen={toggleManagerVender}
          role="dialog"
          autoFocus={true}
          centered
          id="addBrandModal"
          toggle={toggleManagerVendorModal}
        >
          <form>
            <ModalHeader
              toggle={() => {
                handleVenderContactDialogClose();
              }}
            ></ModalHeader>
            <ModalBody>
              <Row>
                <Col md={12} className="mb-3">
                  <Label className="form-label" htmlFor="map">
                    Net Cost Source
                  </Label>
                  <Nav tabs className="mb-3">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => toggleTab("1")}
                      >
                        Akeneo
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => toggleTab("2")}
                      >
                        % of List Price
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col md={12}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="dealer">
                      Dealer Discount
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Price"
                      value={brandData?.dealerDiscount}
                      onChange={(e) => {
                        let c = { ...brandData };
                        c.dealerDiscount = e.target.value;
                        setBrandData(c);
                      }}
                    />
                    {newValidation?.dealerDiscount && (
                      <p className="validation_error_text">
                        {newValidation?.dealerDiscount}
                      </p>
                    )}
                  </div>
                </Col>

                <Col md={12}>
                  <div className="mb-3">
                    <Label htmlFor="Map-Policy" className="form-label">
                      Map Policy
                    </Label>
                    <select
                      name="map_policy"
                      className="form-control"
                      value={brandData?.MAP_Policy} // Set the selected value based on state
                      onChange={(e) => {
                        let c = { ...brandData };
                        c.MAP_Policy = e.target.value;
                        setBrandData(c);
                      }}
                    >
                      <option value={""}>Select</option>
                      <option value={"true"}>Yes</option>
                      <option value={"false"}>No</option>
                    </select>
                  </div>
                </Col>
                {brandData?.MAP_Policy === "true" && (
                  <>
                    <Col md={12} className="mb-3">
                      <Label className="form-label" htmlFor="map">
                        Map Price Source
                      </Label>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: mapActiveTab === "1",
                            })}
                            onClick={() => toggleMapTab("1")}
                          >
                            Akeneo
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: mapActiveTab === "2",
                            })}
                            onClick={() => toggleMapTab("2")}
                          >
                            % of List Price
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="map">
                          MAP Price % Off Of List Price
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={brandData?.Dealer_MapPrice}
                          onChange={(e) => {
                            let c = { ...brandData };
                            c.Dealer_MapPrice = e.target.value;
                            setBrandData(c);
                          }}
                        />
                        {newValidation?.MAP_Policy && (
                          <p className="validation_error_text">
                            {newValidation?.MAP_Policy}
                          </p>
                        )}
                      </div>
                    </Col>
                  </>
                )}

                <Col md={12}>
                  <div className="mb-3">
                    <div className="d-flex ">
                      <Label htmlFor="readonlyInput" className="form-label">
                        Quarterly Rebate
                      </Label>
                    </div>
                    <div className="form-icon">
                      <select
                        name="shipping cost"
                        className="form-control"
                        value={brandData?.is_Quarterly_Rebate}
                        onChange={(e) => {
                          setBrandData({
                            ...brandData,
                            is_Quarterly_Rebate: e.target.value,
                            is_Quarterly_Volume_Based_Rebate: "",
                          });
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                      </select>
                    </div>
                  </div>
                </Col>
                {brandData?.is_Quarterly_Rebate === "true" && (
                  <Col md={12}>
                    <div className="mb-3">
                      <div className="d-flex ">
                        <Label htmlFor="readonlyInput" className="form-label">
                          Volume Based
                        </Label>
                      </div>
                      <div className="form-icon">
                        <select
                          name="shipping cost"
                          className="form-control"
                          value={brandData?.is_Quarterly_Volume_Based_Rebate}
                          onChange={(e) => {
                            setBrandData({
                              ...brandData,
                              is_Quarterly_Volume_Based_Rebate: e.target.value,
                            });
                          }}
                        >
                          <option value={""}>Select</option>
                          <option value={"true"}>Yes</option>
                          <option value={"false"}>No</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                )}

                <QuarterlyRowData
                  brandData={brandData}
                  addRow={addRow}
                  querterRowData={querterRowData}
                  handleRowChange={handleRowChange}
                  deleteRow={deleteRow}
                  setBrandData={setBrandData}
                />

                <Col md={12}>
                  <div className="mb-3">
                    <div className="d-flex ">
                      <Label htmlFor="readonlyInput" className="form-label">
                        Annual Rebate
                      </Label>
                    </div>
                    <div className="form-icon">
                      <select
                        name="shipping cost"
                        className="form-control"
                        value={brandData?.is_Annual_Rebate}
                        onChange={(e) => {
                          setBrandData({
                            ...brandData,
                            is_Annual_Rebate: e.target.value,
                            is_Annual_Volume_Based_Rebate: "",
                          });
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                      </select>
                    </div>
                  </div>
                </Col>

                {brandData?.is_Annual_Rebate === "true" ? (
                  <Col md={12}>
                    <div className="mb-3 mt-3">
                      <div className="d-flex ">
                        <Label htmlFor="readonlyInput" className="form-label">
                          Volume Based
                        </Label>
                      </div>
                      <div className="form-icon">
                        <select
                          name="shipping cost"
                          className="form-control"
                          value={brandData?.is_Annual_Volume_Based_Rebate}
                          onChange={(e) => {
                            setBrandData({
                              ...brandData,
                              is_Annual_Volume_Based_Rebate: e.target.value,
                            });
                          }}
                        >
                          <option value={""}>Select</option>
                          <option value={"true"}>Yes</option>
                          <option value={"false"}>No</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                ) : (
                  ""
                )}

                <AnnualRowData
                  brandData={brandData}
                  addAnualRow={addAnualRow}
                  annualRowData={annualRowData}
                  handleAnnualRowChange={handleAnnualRowChange}
                  deleteAnnualRow={deleteAnnualRow}
                  setBrandData={setBrandData}
                />

                <Col md={6}>
                  <div className="mb-3 mt-3">
                    <Label className="form-label" htmlFor="map">
                      Minimum Margin
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      placeholder="Enter %"
                      value={brandData?.minimumMargin}
                      onChange={(e) => {
                        setBrandData({
                          ...brandData,
                          minimumMargin: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {newValidation?.minimumMargin && (
                    <p className="validation_error_text">
                      {newValidation?.minimumMargin}
                    </p>
                  )}
                </Col>
                <Col md={6}>
                  <div className="mb-3 mt-3">
                    <Label className="form-label" htmlFor="map">
                      Maximum Margin
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      placeholder="Enter %"
                      value={brandData?.maxMargin}
                      onChange={(e) => {
                        setBrandData({
                          ...brandData,
                          maxMargin: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>

                <Col md={12}>
                  <div className="mb-3">
                    <div className="d-flex ">
                      <Label htmlFor="readonlyInput" className="form-label">
                        Free shipping for customer
                      </Label>
                    </div>
                    <div className="form-icon">
                      <select
                        name="shipping cost"
                        className="form-control"
                        value={brandData?.isShipping_Cost}
                        onChange={(e) => {
                          setBrandData({
                            ...brandData,
                            isShipping_Cost: e.target.value,
                          });
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                      </select>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="mb-3">
                    <div className="d-flex ">
                      <Label htmlFor="readonlyInput" className="form-label">
                        Competition price match
                      </Label>
                    </div>
                    <div className="form-icon d-flex gap-3">
                      <Label htmlFor="roundDown" className="form-label">
                        Round down
                      </Label>
                      <Input
                        type="radio"
                        id="roundDown"
                        checked={brandData?.isRoundDown}
                        name="priceMatch"
                        onChange={(e) => {
                          setBrandData({
                            ...brandData,
                            isRoundDown: true,
                          });
                        }}
                      />

                      <Label htmlFor="exactMatch" className="form-label">
                        Exact match
                      </Label>
                      <Input
                        type="radio"
                        id="exactMatch"
                        checked={!brandData?.isRoundDown}
                        name="priceMatch"
                        onChange={(e) => {
                          setBrandData({
                            ...brandData,
                            isRoundDown: false,
                          });
                        }}
                      />
                    </div>
                  </div>
                </Col>

                {brandData.isShipping_Cost === "true" ? (
                  <Col md={12} className="mb-3">
                    <Label className="form-label" htmlFor="map">
                      Shipping Cost Rule Source
                    </Label>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: rulesActiveTab === "1",
                          })}
                          onClick={() => toggleRulesTab("1")}
                        >
                          Our Rules
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: rulesActiveTab === "2",
                          })}
                          onClick={() => toggleRulesTab("2")}
                        >
                          Vendor Rules
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={rulesActiveTab}>
                      <TabPane tabId="2">
                        <Col md={12}>
                          {" "}
                          <Label className="form-label mt-3" htmlFor="map">
                            Vendor Shipping Rule
                          </Label>
                        </Col>
                        <Row>
                          <Col md={4}>
                            <div className="mb-3 mt-3">
                              <Input
                                type="number"
                                className="form-control"
                                placeholder="Enter $"
                                value={brandData?.vendorRulePrice}
                                onChange={(e) => {
                                  setBrandData({
                                    ...brandData,
                                    vendorRulePrice: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </Col>
                          <Col md={1}>
                            <Label className="form-label mt-3" htmlFor="map">
                              OR
                            </Label>
                          </Col>
                          <Col md={4}>
                            <div className="mb-3 mt-3">
                              <Input
                                type="number"
                                className="form-control"
                                placeholder="Enter %"
                                value={brandData?.vendorRulePrice_Percentage}
                                onChange={(e) => {
                                  setBrandData({
                                    ...brandData,
                                    vendorRulePrice_Percentage: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </Col>
                          <Col md={3}>
                            <Label className="form-label  mt-3" htmlFor="map">
                              Of List Price
                            </Label>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </Col>
                ) : (
                  ""
                )}
                <AdditionalFee
                  additionalFeeData={aditionalFee}
                  addAdditionalRow={addAdditionalRow}
                  deleteAdditionalRow={deleteAdditionalRow}
                  handleAdditionalRowChange={handleAdditionalRowChange}
                />
              </Row>
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  handleVenderContactDialogClose();
                }}
              >
                Close
              </button>

              <button
                type="button"
                onClick={(e) => onSubmit(e)}
                className="btn btn-success"
              >
                Update
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default ViewBrands;
