import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

function QuarterlyRowData({
  brandData,
  addRow,
  querterRowData,
  handleRowChange,
  deleteRow,
  setBrandData,
}) {
  return (
    <>
      {brandData?.is_Quarterly_Volume_Based_Rebate === "true" && (
        <Row>
          <Label onClick={addRow} className="text_label_add mt-3" htmlFor="map">
            Add Row
          </Label>
          {querterRowData.map((rowData, index) => {
            return (
              <React.Fragment key={index}>
                <Row className="align-items-center">
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
                        onChange={(e) => handleRowChange(e, index, "from")}
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
                        onChange={(e) => handleRowChange(e, index, "until")}
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
                        onChange={(e) => handleRowChange(e, index, "percent")}
                      />
                    </div>
                  </Col>
                  <Col md={1} className="mt-1 mb-3">
                    <Label
                      onClick={() => deleteRow(index)}
                      className="text_label_delete mt-4"
                      htmlFor="map"
                    >
                      Delete
                    </Label>
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
        </Row>
      )}

      {brandData?.is_Quarterly_Volume_Based_Rebate === "false" &&
      brandData.is_Quarterly_Rebate === "true" ? (
        <div className=" mb-3">
          <Col md={12}>
            <div className="mb-3 mt-3">
              <Label className="form-label" htmlFor="map">
                Add (%)
              </Label>
              <Input
                type="number"
                className="form-control"
                placeholder="Enter %"
                value={brandData?.Quarterly_Rebate_Percentage}
                onChange={(e) => {
                  let c = { ...brandData };
                  c.Quarterly_Rebate_Percentage = e.target.value;
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

export default QuarterlyRowData;
