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
import Dropzone from "react-dropzone";
import Flatpickr from "react-flatpickr";
import TableCommonContainer from "../../../Components/Common/TableCommonContainer";

const VenderPayment = () => {
  const [toggleVenderPriceList, settoggleVenderPriceListModal] =
    useState(false);

  const toggleVendorPriceListModal = () => {
    settoggleVenderPriceListModal(!toggleVenderPriceList);
  };
  const handleVenderPriceListDialogClose = () => {
    settoggleVenderPriceListModal(false);
  };

  // createObjectURL
  const [selectedFiles, setselectedFiles] = useState([]);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  const upcomingColumns = useMemo(() => {
    let arr = [];

    arr.push({
      Header: "Vend Brand",
      Cell: (product) => {
        return product.row.original[0] || "";
      },
    });
    arr.push({
      Header: "Price",
      Cell: (product) => {
        return product.row.original[1] || "";
      },
    });
    arr.push({
      Header: "Start Date",
      Cell: (product) => {
        return product.row.original[2] || "";
      },
    });
    return arr;
  }, []);
  const upcomingArray = [["dvsdvsvd","100", "12-2-22"]];
  const currentColumns = useMemo(() => {
    let arr = [];

    arr.push({
      Header: "Vender",
      Cell: (product) => {
        return product.row.original[0] || "";
      },
    });
    arr.push({
      Header: "Price",
      Cell: (product) => {
        return product.row.original[1] || "";
      },
    });
    arr.push({
      Header: "Start Date",
      Cell: (product) => {
        return product.row.original[2] || "";
      },
    });
    arr.push({
      Header: "Action",
      Cell: (product) => {
        return product.row.original[3] || "";
      },
    });
    return arr;
  }, []);

  const currentArray = [["dvsdvsvd", "100", "12-2-22", "update"]];

  const archiveColumns = useMemo(() => {
    let arr = [];

    arr.push({
      Header: "Start Date",
      Cell: (product) => {
        return product.row.original[2] || "";
      },
    });
    arr.push({
      Header: "End Date",
      Cell: (product) => {
        return product.row.original[2] || "";
      },
    });
    arr.push({
      Header: "Price",
      Cell: (product) => {
        return product.row.original[1] || "";
      },
    });
    return arr;
  }, []);

  const archiveArray = [["12-2-22", "100", "12-2-22"]];

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer closeButton={false} limit={1} />
        <Container fluid>
          <BreadCrumb title="Price Lists" pageTitle="" />
          <Row>
            <Col>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h4>Upcoming Price List</h4>
                      </div>
                      {/* <div className="flex-shrink-0">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={toggleVendorPriceListModal}
                        >
                          + Add Price
                        </button>
                      </div> */}
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {upcomingArray && upcomingArray.length > 0 ? (
                      <TableCommonContainer
                        columns={upcomingColumns}
                        data={upcomingArray || []}
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
          <Row>
            <Col>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h4>Current Price Lists</h4>
                      </div>
                      {/* <div className="flex-shrink-0">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={toggleVendorPriceListModal}
                        >
                          + Add Price
                        </button>
                      </div> */}
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {currentArray && currentArray.length > 0 ? (
                      <TableCommonContainer
                        columns={currentColumns}
                        data={currentArray || []}
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
          <Row>
            <Col>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h4>Archive Price List</h4>
                      </div>
                      {/* <div className="flex-shrink-0">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={toggleVendorPriceListModal}
                        >
                          + Add Price
                        </button>
                      </div> */}
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {archiveArray && archiveArray.length > 0 ? (
                      <TableCommonContainer
                        columns={archiveColumns}
                        data={archiveArray || []}
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
        isOpen={toggleVenderPriceList}
        role="dialog"
        autoFocus={true}
        centered
        id="addBrandModal"
        toggle={toggleVendorPriceListModal}
      >
        <ModalHeader
          toggle={() => {
            handleVenderPriceListDialogClose();
          }}
        ></ModalHeader>
        <ModalBody>
          <Row>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                Start Date
              </Label>
              <Flatpickr
                className="form-control"
                options={{
                  dateFormat: "d M, Y",
                }}
                placeholder="Selact Date"
              />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option>Status </option>
                <option defaultValue="1">Active</option>
                <option defaultValue="2">Inactive</option>
              </select>
            </div>
            <div className="mb-3">
              <Label className="form-label" htmlFor="product-title-input">
                Upload File
              </Label>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  handleAcceptedFiles(acceptedFiles);
                }}
              >
                {({ getRootProps }) => (
                  <div
                    className="dropzone dz-clickable"
                    style={{
                      width: "100%",
                      minHeight: "150px",
                    }}
                  >
                    <div className="dz-message needsclick" {...getRootProps()}>
                      <div className="mb-3">
                        <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                      </div>
                      <h5>Drop files here or click to upload.</h5>
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              handleVenderPriceListDialogClose();
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
export default VenderPayment;
