import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Col, Input, Label, Row } from "reactstrap";
import {
  saveCompetitonProductsData,
  update_Competition_products,
} from "./ProductsService";
import { toast } from "react-toastify";

function CompetitionProductsData({
  productsData,
  setProductsData,
  competeData,
  setCompeteData,
}) {
  const [btnLock, setBtnLock] = useState(false);

  const onSubmit = async () => {
    setBtnLock(true);
    const finalData = competeData.map((item) => {
      return {
        ...item,
        brandId: productsData.Brand,
        productId: productsData.SKU,
      };
    });

    const response = await update_Competition_products({
      competeData: finalData,
    });
    if (response) {
      toast.success("data save successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setBtnLock(false);
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
                        {competeData?.map((rowData, index) => {
                          return (
                            <>
                              <Row>
                                <Col md={2}>
                                  <div className="mt-4 d-flex justify-content-center">
                                    <h5>{rowData.name}</h5>
                                  </div>
                                </Col>
                                <Col md={2}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="Product-Link"
                                      className="form-label"
                                    >
                                      Product Link
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="Product-Link"
                                      placeholder="Enter Link"
                                      value={rowData?.productLink}
                                      onChange={(e) =>
                                        handleRowChange(e, index, "productLink")
                                      }
                                    />
                                  </div>
                                </Col>
                                <Col md={2}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="Product-Link"
                                      className="form-label"
                                    >
                                      Free Shipping
                                    </Label>
                                    <select
                                      className="form-select"
                                      id="Product-Link"
                                      value={rowData?.freeShipping}
                                      onChange={(e) =>
                                        handleRowChange(
                                          e,
                                          index,
                                          "freeShipping"
                                        )
                                      }
                                    >
                                      <option value="">Select</option>
                                      <option value="true">Yes</option>
                                      <option value="false">No</option>
                                    </select>
                                  </div>
                                </Col>

                                <Col md={2}>
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
                                    />
                                  </div>
                                </Col>
                                <Col md={2}>
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
                                      placeholder="List Price"
                                      value={rowData?.shippingPrice}
                                      onChange={(e) =>
                                        handleRowChange(
                                          e,
                                          index,
                                          "shippingPrice"
                                        )
                                      }
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
                                      value={rowData?.result}
                                      onChange={(e) =>
                                        handleRowChange(e, index, "result")
                                      }
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </>
                          );
                        })}
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
