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
import TableCommonContainer from "../../../Components/Common/TableCommonContainer";
import { ToastContainer } from "react-toastify";

const VendorContacts = () => {
  const [toggleVenderContact, settoggleVenderContactModal] = useState(false);
  const categoryColumns = useMemo(() => {
    let arr = [];
    arr.push({
      Header: "#",
      Cell: (cell) => {
        return (
          <input type="checkbox" className="productCheckBox form-check-input" />
        );
      },
    });
    arr.push({
      Header: "Name",
      Cell: (product) => {
        return product.row.original[0] || "";
      },
    });
    arr.push({
      Header: "Department",
      Cell: (product) => {
        return product.row.original[1] || "";
      },
    });
    arr.push({
      Header: "E-Mail",
      Cell: (product) => {
        return product.row.original[2] || "";
      },
    });
    arr.push({
      Header: "Phone Number",
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
  const toggleVendorContactModal = () => {
    settoggleVenderContactModal(!toggleVenderContact);
  };
  const handleVenderContactDialogClose = () => {
    settoggleVenderContactModal(false);
  };
  const contactArray = [
    ["Dutchess", "amnsmsn", "Dutchess@gmail.com", "743986347", "dss"],
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer closeButton={false} limit={1} />
        <Container fluid>
          <BreadCrumb title="Vendor" pageTitle="" />
          <Row>
            <Col>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h4>Vendor Contacts</h4>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={toggleVendorContactModal}
                        >
                          + Add Contacts
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {contactArray && contactArray.length > 0 ? (
                      <TableCommonContainer
                        columns={categoryColumns}
                        data={contactArray || []}
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
        isOpen={toggleVenderContact}
        role="dialog"
        autoFocus={true}
        centered
        id="addBrandModal"
        toggle={toggleVendorContactModal}
      >
        <ModalHeader
          toggle={() => {
            handleVenderContactDialogClose();
          }}
        ></ModalHeader>
        <ModalBody>
          <Row>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter Name"
                name="label"
              />
            </div>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                Department
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter Department"
                name="code"
              />
            </div>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                E-Mail
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter E-Mail"
                name="label"
              />
            </div>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                Phone Number
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter Phone Number"
                name="code"
              />
            </div>
            <div className="mt-3">
              <div>
                <div className="form-check">
                  <Input className="form-check-input" type="checkbox" />
                  <Label className="form-check-label" for="Order">
                    Order submission
                  </Label>
                </div>
              </div>
            </div>
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
          <button type="button" className="btn btn-success">
            Save
          </button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
export default VendorContacts;
