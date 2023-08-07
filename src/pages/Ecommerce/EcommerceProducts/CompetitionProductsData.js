import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Button, Col, Input, Label, Row } from "reactstrap";
import {
  saveCompetitonProductsData,
  update_Competition_products,
} from "./ProductsService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CompetitionProductsData({
  productsData,
  setProductsData,
  competeData,
  setCompeteData,
  totalAdd,
  getData,
}) {
  const [btnLock, setBtnLock] = useState(false);

  const [editMode, setEditMode] = useState(false);

  console.log(productsData);

  const onSubmit = async () => {
    setBtnLock(true);
    setEditMode(false);
    const finalData = competeData.map((item) => {
      return {
        ...item,
        brandId: productsData.Brand,
        productId: productsData.SKU,
      };
    });

    const productsCalc = {
      netPrice: productsData?.Net_Cost,
      shippingCost: productsData?.Shipping_Cost,
      ourFees: totalAdd,
      minimumMargin: productsData?.minimumMargin,
      id: productsData.id,
      isRoundDown: productsData?.isRoundDown,
      Dealer_NetCost_Discount: productsData?.Dealer_NetCost_Discount,
    };

    const response = await update_Competition_products({
      competeData: finalData,
      productFields: productsCalc,
    });
    if (response) {
      toast.success("data save successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setBtnLock(false);
      getData();
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleRowChange = (e, index, field) => {
    const { value } = e.target;

    // Create a copy of the productsData array
    const updatedProductsData = [...competeData];

    // Update the specific object at the given index with the new value
    updatedProductsData[index] = {
      ...updatedProductsData[index],
      [field]: value,
    };

    // Set the modified array back to the state
    setCompeteData(updatedProductsData);
  };

  const disableButton = (e, index) => {
    const isChecked = e.target.checked;

    setCompeteData((prevData) => {
      const updatedData = prevData.map((data, dataIndex) => {
        if (dataIndex === index) {
          return {
            ...data,
            isProductAvailible: isChecked,
            result: isChecked ? "product not available" : "",
          };
        }
        return data;
      });
      return updatedData;
    });
  };

  const shipButton = (e, index) => {
    const isChecked = e.target.checked;

    setCompeteData((prevData) => {
      const updatedData = prevData.map((data, dataIndex) => {
        if (dataIndex === index) {
          return {
            ...data,
            freeShipping: isChecked,
          };
        }
        return data;
      });
      return updatedData;
    });
  };

  console.log(competeData);

  const handleEditClick = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <Row>
      <Col md={12}>
        <Row>
          <Col>
            <div className="col-xl-12 col-lg-12">
              <>
                <div className="card">
                  {productsData?.competitionData?.length === 0 ? (
                    <div className="d-flex justify-content-center p-3">
                      <h5>No competition Website Selected</h5>
                    </div>
                  ) : (
                    <>
                      <div className="card-header">
                        <div className="d-flex justify-content-between">
                          <BreadCrumb
                            title="Competition Section"
                            pageTitle=""
                          />
                          <button
                            type="button"
                            onClick={(e) => onSubmit(e)}
                            className="btn btn-success"
                            style={{ width: "120px" }}
                            disabled={btnLock}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="card-body pt-3">
                        <Row>
                          <Col md={1}></Col>
                          <Col md={2}>
                            <div
                              className="d-flex justify-content-between"
                              // style={{ paddingLeft: "172px", gap: "20px" }}
                            >
                              <h6
                                className="m-0 "
                                style={{ paddingLeft: "50px" }}
                              >
                                Disable
                              </h6>
                              <h6 className="m-0">Free Shipping</h6>
                            </div>
                          </Col>
                          <Col md={1}></Col>
                          <Col md={2}>
                            <div
                              className="d-flex justify-content-between"
                              style={{ paddingLeft: "130px" }}
                            >
                              <Button
                                onClick={handleEditClick}
                                className="edit_btn_compete btn btn-success"
                              >
                                Edit
                              </Button>
                            </div>
                          </Col>
                        </Row>
                        <>
                          {competeData?.map((rowData, index) => {
                            return (
                              <>
                                <Row>
                                  <div className="d-flex justify-content-around">
                                    <Col md={1}>
                                      <div className="mt-4 d-flex justify-content-center">
                                        <a
                                          href={rowData.website}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <h5>{rowData.name}</h5>
                                        </a>
                                      </div>
                                    </Col>
                                    <Col
                                      md={1}
                                      className="d-flex justify-content-between pt-3"
                                    >
                                      <div className="mt-4 d-flex  justify-content-center align-items-baseline">
                                        <input
                                          className="check_box_input "
                                          type="checkbox"
                                          onChange={(e) =>
                                            disableButton(e, index)
                                          }
                                          checked={rowData?.isProductAvailible}
                                        />
                                      </div>
                                      <div className="mt-4 d-flex justify-content-center align-items-baseline">
                                        <input
                                          className="check_box_input"
                                          type="checkbox"
                                          checked={rowData?.freeShipping}
                                          onChange={(e) => shipButton(e, index)}
                                        />
                                      </div>
                                    </Col>
                                    <Col md={1}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor=" List-Price"
                                          className="form-label"
                                        >
                                          Shipping Price
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Shipping Price"
                                          value={rowData?.shippingPrice}
                                          onChange={(e) =>
                                            handleRowChange(
                                              e,
                                              index,
                                              "shippingPrice"
                                            )
                                          }
                                          disabled={
                                            rowData?.freeShipping ||
                                            rowData?.isProductAvailible
                                          }
                                        />
                                      </div>
                                    </Col>

                                    <Col md={1}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="Product-Link"
                                          className="form-label"
                                        >
                                          Product Link
                                        </Label>
                                        {editMode ? (
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="Product-Link"
                                            placeholder="Enter Link"
                                            value={rowData?.productLink}
                                            onChange={(e) =>
                                              handleRowChange(
                                                e,
                                                index,
                                                "productLink"
                                              )
                                            }
                                            disabled={
                                              rowData?.isProductAvailible
                                            }
                                          />
                                        ) : (
                                          <>
                                            {rowData?.productLink !== "" ? (
                                              <a
                                                href={rowData?.productLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {rowData?.productLink}
                                              </a>
                                            ) : (
                                              <Input
                                                type="text"
                                                className="form-control"
                                                id="Product-Link"
                                                placeholder="Enter Link"
                                                value={rowData?.productLink}
                                                onChange={(e) =>
                                                  handleRowChange(
                                                    e,
                                                    index,
                                                    "productLink"
                                                  )
                                                }
                                                disabled={
                                                  rowData?.isProductAvailible
                                                }
                                              />
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </Col>

                                    <Col md={1}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="Profit-Margin"
                                          className="form-label"
                                        >
                                          Price
                                        </Label>
                                        <Input
                                          type="number"
                                          className="form-control"
                                          id="Profit-Margin"
                                          placeholder="Enter Price"
                                          value={rowData?.price}
                                          onChange={(e) =>
                                            handleRowChange(e, index, "price")
                                          }
                                          disabled={rowData?.isProductAvailible}
                                        />
                                      </div>
                                    </Col>

                                    <Col md={1}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor=" List-Price"
                                          className="form-label"
                                        >
                                          Total Price
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder=""
                                          value={rowData?.totalPrice}
                                          onChange={(e) =>
                                            handleRowChange(
                                              e,
                                              index,
                                              "totalPrice"
                                            )
                                          }
                                          readOnly
                                          disabled={rowData?.isProductAvailible}
                                        />
                                      </div>
                                    </Col>
                                    <Col md={1}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor=" List-Price"
                                          className="form-label"
                                        >
                                          Margin
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder=""
                                          value={`% ${Number.parseFloat(
                                            rowData?.margin
                                          ).toFixed(2)}`}
                                          onChange={(e) =>
                                            handleRowChange(e, index, "margin")
                                          }
                                          readOnly
                                          disabled={rowData?.isProductAvailible}
                                        />
                                      </div>
                                    </Col>
                                    <Col md={2}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="Shipping-Cost"
                                          className="form-label"
                                        >
                                          Result
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          style={{
                                            backgroundColor:
                                              rowData.result ===
                                              "ignore - under margin"
                                                ? "#D3D3D3"
                                                : rowData.result ===
                                                  "Compete - Lowest Price"
                                                ? "#008000"
                                                : rowData.result === "Compete"
                                                ? "#90EE90"
                                                : rowData.result ===
                                                  "product not available"
                                                ? "#D3D3D3"
                                                : "#FFFFFF",
                                          }}
                                          value={rowData?.result}
                                          onChange={(e) =>
                                            handleRowChange(e, index, "result")
                                          }
                                          readOnly
                                          disabled={true}
                                        />
                                      </div>
                                    </Col>
                                  </div>
                                </Row>
                              </>
                            );
                          })}
                        </>
                      </div>
                    </>
                  )}
                </div>
              </>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default CompetitionProductsData;
