import { Container, Row, Col } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import TableCommonContainer from "../../../Components/Common/TableCommonContainer";
import React, { useEffect, useMemo, useState } from "react";
import { getIntegrationData } from "./IntegerationService";

const IntegrationList = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoader(true);

    const response = await getIntegrationData();

    if (response) {
      setData(response);

      console.log(response, "response");
    } else {
      setLoader(false);
    }
    setLoader(false);
  };

  const categoryColumns = useMemo(() => {
    let arr = [];
    arr.push({
      Header: "Name",
      accessor: "userName",
      filterable: false,
    });
    arr.push({
      Header: "Password",
      accessor: "password",
      filterable: false,
    });
    arr.push({
      Header: "Secret",
      accessor: "secret",
      filterable: false,
    });
    arr.push({
      Header: "Client Id",
      accessor: "clientId",
      filterable: false,
    });

    return arr;
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer closeButton={false} limit={1} />
        <Container fluid>
          <BreadCrumb title="Integrations" pageTitle="" />
          <Row>
            <Col>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h4>Integrations List</h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {data && data.length > 0 ? (
                      <TableCommonContainer
                        columns={categoryColumns}
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
    </React.Fragment>
  );
};
export default IntegrationList;
