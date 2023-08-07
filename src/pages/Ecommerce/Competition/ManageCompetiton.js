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
import {
  deleteCompetitionData,
  getCompetitionData,
  saveCompetitionData,
  updateCompetitionData,
} from "./CompetitionService";
import BrandsTableContainer from "../../../Components/Common/BrandsTableContainer";

function ManageCompetition() {
  const [data, setData] = useState();
  const [loader, setLoader] = useState();
  const [toggleManager, settoggleManager] = useState(false);
  const [toggleDeleteManager, settoggleDeleteManager] = useState(false);
  const [selectData, setSelectedData] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const [InputData, setInputData] = useState({
    name: "",
    website: "",
  });

  const [newValidation, setNewValidation] = useState({
    name: "",
    website: "",
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
      const response = await getCompetitionData();

      if (response) {
        setData(response);

        console.log(response);
        setLoader(false);
      } else {
        setLoader(false);
      }
    }, 1000);
  };

  const Submit = async (status) => {
    const errors = {};
    const requiredFields = [
      { field: "website", message: "Website is required" },
      { field: "name", message: "Name is required" },
    ];

    requiredFields.forEach(({ field, message }) => {
      if (!InputData[field]) {
        errors[field] = message;
      }
    });

    setNewValidation(errors);

    if (Object.keys(errors).length === 0) {
      try {
        if (editStatus) {
          const response = await saveCompetitionData(InputData);
          if (response) {
            getData();
            settoggleManager(false);
            setInputData({
              name: "",
              website: "",
            });
            toast.success("Competition successfully created", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.error(response.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } else {
          const finalData = {
            name: InputData.name,
            website: InputData.website,
          };
          const response = await updateCompetitionData(InputData.id, finalData);
          if (response) {
            getData();
            settoggleManager(false);
            setInputData({
              name: "",
              website: "",
            });
            toast.success("Competiton successfully updated", {
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
      Header: "Name",
      accessor: "name",
      filterable: false,
    });
    arr.push({
      Header: "Website",
      accessor: "website",
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
      name: "",
      website: "",
    });
    settoggleManager(false);
  };
  const handleContactDeleteDialogClose = () => {
    settoggleDeleteManager(false);
  };

  const deleteRow = async () => {
    const response = await deleteCompetitionData(selectData);
    if (response) {
      settoggleDeleteManager(false);
      const filteredData = data.filter((row) => row.id !== selectData);
      setData(filteredData);
      settoggleDeleteManager(false);

      toast.success("Competition successfully deleted", {
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
                          <h4>Competition</h4>
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
                        Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        value={InputData?.name}
                        onChange={(e) =>
                          setInputData({
                            ...InputData,
                            name: e.target.value,
                          })
                        }
                      />
                      {newValidation?.name && (
                        <p className="validation_error_text">
                          {newValidation?.name}
                        </p>
                      )}
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label className="form-label" htmlFor="map">
                        Website Link
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Link"
                        value={InputData?.website}
                        onChange={(e) =>
                          setInputData({
                            ...InputData,
                            website: e.target.value,
                          })
                        }
                      />
                      {newValidation?.website && (
                        <p className="validation_error_text">
                          {newValidation?.website}
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
                  <h4>Are you sure you want to delete this Competition!</h4>
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

export default ManageCompetition;
