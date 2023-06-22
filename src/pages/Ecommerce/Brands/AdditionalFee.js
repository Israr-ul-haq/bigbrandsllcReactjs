import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

function AdditionalFee({
  additionalFeeData,
  addAdditionalRow,
  deleteAdditionalRow,
  handleAdditionalRowChange,
}) {
  console.log(additionalFeeData, "---------additionalFeeData---------");
  return (
    <div>
      <Label
        htmlFor="readonlyInput"
        onClick={addAdditionalRow}
        className="text_label_add"
      >
        {additionalFeeData?.length === 0 ? "ADD FEE" : " ADD ADDITIONAL FEE"}
      </Label>

      {additionalFeeData?.map((i, index) => {
        return (
          <>
            <Row>
              <Label
                onClick={() => deleteAdditionalRow(index)}
                className="text_label_delete "
                style={{
                  textAlign: "end",
                }}
                htmlFor="map"
              >
                Delete
              </Label>
              <Label htmlFor="readonlyInput" className="form-label">
                Fee Name
              </Label>
              <Col md={12}>
                <div className="mb-3">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={i.feeName}
                    onChange={(e) =>
                      handleAdditionalRowChange(e, index, "feeName")
                    }
                  />
                </div>
              </Col>
              <Row className="align-items-center">
                <Col md={4}>
                  <div className="mb-3 mt-3">
                    <Input
                      type="number"
                      className="form-control"
                      placeholder="Enter $"
                      value={i.price}
                      onChange={(e) =>
                        handleAdditionalRowChange(e, index, "price")
                      }
                    />
                  </div>
                </Col>
                <Col md={1}>
                  <Label className="form-label " htmlFor="map">
                    OR
                  </Label>
                </Col>
                <Col md={4}>
                  <div className="mb-3 mt-3">
                    <Input
                      type="number"
                      className="form-control"
                      placeholder="Enter %"
                      value={i.percentage}
                      onChange={(e) =>
                        handleAdditionalRowChange(e, index, "percentage")
                      }
                    />
                  </div>
                </Col>
                <Col md={3}>
                  <Label className="form-label  " htmlFor="map">
                    Of List Price
                  </Label>
                </Col>
              </Row>
            </Row>
          </>
        );
      })}
    </div>
  );
}

export default AdditionalFee;
