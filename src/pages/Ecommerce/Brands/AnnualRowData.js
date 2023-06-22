import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

function AnnualRowData({
  brandData,
  addAnualRow,
  annualRowData,
  handleAnnualRowChange,
  deleteAnnualRow,
  setBrandData,
}) {
  return (
    <>
      {brandData?.is_Annual_Volume_Based_Rebate === "true" && (
        <Row className="align-items-center">
          <Label
            onClick={addAnualRow}
            className="text_label_add mt-3"
            htmlFor="map"
          >
            Add Row
          </Label>
          {annualRowData.map((rowData, index) => {
            return (
              <React.Fragment key={index}>
                <Col md={4} className="mt-3 mb-3">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="map">
                      From
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      placeholder="Enter"
                      value={rowData.from}
                      onChange={(e) => handleAnnualRowChange(e, index, "from")}
                    />
                  </div>
                </Col>
                <Col md={4} className="mt-3 mb-3">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="map">
                      Until
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      placeholder="Enter"
                      value={rowData.until}
                      onChange={(e) => handleAnnualRowChange(e, index, "until")}
                    />
                  </div>
                </Col>
                <Col md={3} className="mt-3 mb-3">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="map">
                      %
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      placeholder="Enter"
                      value={rowData.percent}
                      onChange={(e) =>
                        handleAnnualRowChange(e, index, "percent")
                      }
                    />
                  </div>
                </Col>
                <Col md={1} className="mt-1 mb-3">
                  <Label
                    onClick={() => deleteAnnualRow(index)}
                    className="text_label_delete mt-4"
                    htmlFor="map"
                  >
                    Delete
                  </Label>
                </Col>
              </React.Fragment>
            );
          })}
        </Row>
      )}

      {brandData?.is_Annual_Volume_Based_Rebate === "false" &&
      brandData.is_Annual_Rebate === "true" ? (
        <div className="">
          <Col md={12}>
            <div className="mb-3 mt-3">
              <Label className="form-label" htmlFor="map">
                Add (%)
              </Label>
              <Input
                type="number"
                className="form-control"
                placeholder="Enter %"
                value={brandData?.Annual_Rebate_Percentage}
                onChange={(e) => {
                  let c = { ...brandData };
                  c.Annual_Rebate_Percentage = e.target.value;
                  setBrandData(c);
                }}
              />
            </div>
          </Col>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AnnualRowData;
