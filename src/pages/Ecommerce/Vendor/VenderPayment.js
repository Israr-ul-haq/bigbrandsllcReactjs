import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import TableCommonContainer from "../../../Components/Common/TableCommonContainer";

const VendorContacts = () => {
  const [toggleVenderPayments, settoggleVenderPaymentsModal] = useState(false);
  const categoryColumns = useMemo(() => {
    let arr = [];
    arr.push({
      Header: "Account name",
      Cell: (product) => {
        return product.row.original[0] || "";
      },
    });
    arr.push({
      Header: "Bank Name",
      Cell: (product) => {
        return product.row.original[1] || "";
      },
    });
    arr.push({
      Header: "Routing Number",
      Cell: (product) => {
        return product.row.original[2] || "";
      },
    });
    arr.push({
      Header: "Account number",
      Cell: (product) => {
        return product.row.original[3] || "";
      },
    });
    arr.push({
      Header: "Beneficiary Address",
      Cell: (product) => {
        return product.row.original[4] || "";
      },
    });
    return arr;
  }, []);

  const toggleVendorPaymentModal = () => {
    settoggleVenderPaymentsModal(!toggleVenderPayments);
  };
  const handleVenderPaymentDialogClose = () => {
    settoggleVenderPaymentsModal(false);
  };
  const PaymentArray = [["SBI account", "SBI", "fdsfd", "581669955", "65894"]];

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer closeButton={false} limit={1} />
        <Container fluid>
          <BreadCrumb title="payment instructions" pageTitle="" />
          <Row>
            <Col>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h4>Payment List</h4>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={toggleVendorPaymentModal}
                        >
                          + Add Payment
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {PaymentArray && PaymentArray.length > 0 ? (
                      <TableCommonContainer
                        columns={categoryColumns}
                        data={PaymentArray || []}
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
      {/* modal Add Brand */}
      <Modal
        isOpen={toggleVenderPayments}
        role="dialog"
        autoFocus={true}
        centered
        id="addBrandModal"
        toggle={toggleVendorPaymentModal}
      >
        <ModalHeader
          toggle={() => {
            handleVenderPaymentDialogClose();
          }}
        ></ModalHeader>
        <ModalBody>
          <Row>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                Account name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter Account name"
                name="label"
              />
            </div>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                Bank Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter Bank Name"
                name="code"
              />
            </div>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                Routing Number
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter Routing Number"
                name="label"
              />
            </div>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                Account Number
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter Account Number"
                name="code"
              />
            </div>
            <div className="mt-3">
              <Label className="form-label" htmlFor="product-title-input">
                Beneficiary Address
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter Beneficiary Address"
                name="code"
              />
            </div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              handleVenderPaymentDialogClose();
            }}
          >
            Close
          </button>
          <button type="button" className="btn btn-success">
            Save
          </button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
export default VendorContacts;
