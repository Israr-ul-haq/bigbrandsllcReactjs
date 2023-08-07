import React, { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

import BrandsTableContainer from "../../../Components/Common/BrandsTableContainer";
import {
  deleteRule,
  getRules,
  saveRule,
  updateRule,
} from "./ShippingRuleService";

function ManageShippingRules() {
  const [data, setData] = useState();
  const [loader, setLoader] = useState();
  const [toggleManager, settoggleManager] = useState(false);
  const [toggleDeleteManager, settoggleDeleteManager] = useState(false);
  const [selectData, setSelectedData] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const [InputData, setInputData] = useState({
    freightClass: "",
    weightTo: "",
    weightFrom: "",
    shippingCost: "",
  });

  const [newValidation, setNewValidation] = useState({
    freightClass: "",
    weightTo: "",
    weightFrom: "",
    shippingCost: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const toggleManagerModal = (row, status) => {
    settoggleManager(!toggleManager);
    setInputData(row?.original);
    setEditStatus(status);
  };

  const toggleManagerDeleteModal = (row) => {
    setSelectedData(row?.original?.id);
    settoggleDeleteManager(!toggleDeleteManager);
  };

  const getData = async () => {
    setLoader(true);
    setTimeout(async () => {
      const response = await getRules();
      if (response) {
        setData(response);
        setLoader(false);
      } else {
        setLoader(false);
      }
    }, 1000);
  };

  const Submit = async () => {
    const errors = {};
    const requiredFields = [
      { field: "freightClass", message: "Class is required" },
      { field: "weightTo", message: "Weight is required" },
      { field: "weightFrom", message: "Weight is required" },
      { field: "shippingCost", message: "Price is required" },
    ];

    requiredFields.forEach(({ field, message }) => {
      if (!InputData[field]) {
        errors[field] = message;
      }
    });

    if (InputData.weightTo && InputData.weightFrom) {
      const weightTo = Number(InputData.weightTo);
      const weightFrom = Number(InputData.weightFrom);

      if (weightTo <= weightFrom) {
        errors.weightTo = "Weight-To must be greater than Weight-From";
      }
    }
    setNewValidation(errors);

    if (Object.keys(errors).length === 0) {
      try {
        if (editStatus) {
          const response = await saveRule(InputData);
          if (response) {
            getData();
            settoggleManager(false);
            setInputData({
              freightClass: "",
              weightTo: "",
              weightFrom: "",
              shippingCost: "",
            });
            toast.success("Rule successfully created", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.error(response.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } else {
          const finalData = {
            ruleId: InputData.id,
            freightClass: InputData.freightClass,
            weightTo: InputData.weightTo,
            weightFrom: InputData.weightFrom,
            shippingCost: InputData.shippingCost,
          };
          const response = await updateRule(finalData);
          if (response) {
            getData();
            settoggleManager(false);
            setInputData({
              freightClass: "",
              weightTo: "",
              weightFrom: "",
              shippingCost: "",
            });
            toast.success("Rule successfully updated", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.error(response.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const columns = useMemo(() => {
    let arr = [];

    arr.push({
      Header: "Class",
      accessor: "freightClass",
      filterable: false,
    });
    arr.push({
      Header: "Weight From",
      accessor: "weightFrom",
      filterable: false,
    });
    arr.push({
      Header: "Weight To",
      accessor: "weightTo",
      filterable: false,
    });
    arr.push({
      Header: "Shipping Cost",
      accessor: "shippingCost",
      filterable: false,
    });

    arr.push({
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="actions__button">
          <button
            type="button"
            onClick={() => toggleManagerModal(row, false)}
            className="btn btn-success"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => toggleManagerDeleteModal(row)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      ),
    });
    return arr;
  }, []);

  const handleContactDialogClose = () => {
    setInputData({
      freightClass: "",
      weightTo: "",
      weightFrom: "",
      shippingCost: "",
    });
    settoggleManager(false);
  };
  const handleContactDeleteDialogClose = () => {
    settoggleDeleteManager(false);
  };

  const deleteRow = async () => {
    const response = await deleteRule(selectData);

    if (response) {
      settoggleDeleteManager(false);
      const filteredData = data.filter((row) => row.id !== selectData);
      setData(filteredData);
      settoggleDeleteManager(false);

      toast.success("Rule successfully deleted", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      settoggleDeleteManager(false);
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <ToastContainer closeButton={false} limit={1} />
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="col-xl-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h4>Freight Shipping Rules</h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleManagerModal("", true)}
                          className="btn btn-success"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      {data && data?.length > 0 ? (
                        <BrandsTableContainer
                          columns={columns}
                          data={data || []}
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
                          //   handleSelectPageSize={handleSelectPageSize}
                          //   handleChangePage={handleChangePage}
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
          <Modal
            isOpen={toggleManager}
            role="dialog"
            autoFocus={true}
            centered
            id="addBrandModal"
            toggle={toggleManagerModal}
          >
            <form>
              <ModalHeader
                toggle={() => {
                  handleContactDialogClose();
                }}
              ></ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label className="form-label" htmlFor="map">
                        Freight Class
                      </Label>
                      <Input
                        type="Number"
                        className="form-control"
                        placeholder="Enter Class"
                        value={InputData?.freightClass}
                        onChange={(e) =>
                          setInputData({
                            ...InputData,
                            freightClass: e.target.value,
                          })
                        }
                      />
                      {newValidation?.freightClass && (
                        <p className="validation_error_text">
                          {newValidation?.freightClass}
                        </p>
                      )}
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label className="form-label" htmlFor="map">
                        Weight From
                      </Label>
                      <Input
                        type="Number"
                        className="form-control"
                        placeholder="Enter Weight"
                        value={InputData?.weightFrom}
                        onChange={(e) =>
                          setInputData({
                            ...InputData,
                            weightFrom: e.target.value,
                          })
                        }
                      />
                      {newValidation?.weightFrom && (
                        <p className="validation_error_text">
                          {newValidation?.weightFrom}
                        </p>
                      )}
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label className="form-label" htmlFor="map">
                        Weight To
                      </Label>
                      <Input
                        type="Number"
                        className="form-control"
                        placeholder="Enter Weight"
                        value={InputData?.weightTo}
                        onChange={(e) =>
                          setInputData({
                            ...InputData,
                            weightTo: e.target.value,
                          })
                        }
                      />
                      {newValidation?.weightTo && (
                        <p className="validation_error_text">
                          {newValidation?.weightTo}
                        </p>
                      )}
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label className="form-label" htmlFor="map">
                        Price
                      </Label>
                      <Input
                        type="Number"
                        className="form-control"
                        placeholder="Enter Price"
                        value={InputData?.shippingCost}
                        onChange={(e) =>
                          setInputData({
                            ...InputData,
                            shippingCost: e.target.value,
                          })
                        }
                      />
                      {newValidation?.shippingCost && (
                        <p className="validation_error_text">
                          {newValidation?.shippingCost}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    handleContactDialogClose();
                  }}
                >
                  Close
                </button>
                {editStatus ? (
                  <button
                    type="button"
                    onClick={(e) => Submit()}
                    className="btn btn-success"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => Submit("edit")}
                    className="btn btn-success"
                  >
                    Update
                  </button>
                )}
              </ModalFooter>
            </form>
          </Modal>
          <Modal
            isOpen={toggleDeleteManager}
            role="dialog"
            autoFocus={true}
            centered
            id="addBrandModal"
            toggle={toggleDeleteManager}
          >
            <form>
              <ModalHeader
                toggle={() => {
                  handleContactDeleteDialogClose();
                }}
              ></ModalHeader>
              <ModalBody>
                <Row>
                  {" "}
                  <h4>Are you sure you want to delete this rule!</h4>
                </Row>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    handleContactDeleteDialogClose();
                  }}
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={(e) => deleteRow(e)}
                  className="btn btn-success"
                >
                  Delete
                </button>
              </ModalFooter>
            </form>
          </Modal>
        </div>
      </React.Fragment>
    </div>
  );
}

export default ManageShippingRules;
