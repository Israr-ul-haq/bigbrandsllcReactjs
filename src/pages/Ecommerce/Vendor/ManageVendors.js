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

const ManageVendors = () => {
  const [toggleManagerVender, settoggleManagerVenderModal] = useState(false);
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
      Header: "Label",
      Cell: (product) => {
        return product.row.original[1] || "";
      },
    });
    arr.push({
      Header: "Code",
      Cell: (product) => {
        return product.row.original[0] || "";
      },
    });
    return arr;
  }, []);

  const toggleManagerVendorModal = () => {
    settoggleManagerVenderModal(!toggleManagerVender);
  };
  const handleVenderContactDialogClose = () => {
    settoggleManagerVenderModal(false);
  };
  const managerArray = [["dvsdvsvd", "dcsdsdsv"]];
  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer closeButton={false} limit={1} />
        <Container fluid>
          <BreadCrumb title="Manage Vendors" pageTitle="" />
          <Row>
            <Col>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h4>Manage List</h4>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={toggleManagerVendorModal}
                        >
                          + Add Manage Vendors
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {managerArray && managerArray.length > 0 ? (
                      <TableCommonContainer
                        columns={categoryColumns}
                        data={managerArray || []}
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
        isOpen={toggleManagerVender}
        role="dialog"
        autoFocus={true}
        centered
        id="addBrandModal"
        toggle={toggleManagerVendorModal}
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
                Label
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter Label"
                name="label"
              />
            </div>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                Code
              </Label>
              <Input
                type="text"
                className="form-control"
                id="product-brand-label"
                placeholder="Enter Code"
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
export default ManageVendors;
