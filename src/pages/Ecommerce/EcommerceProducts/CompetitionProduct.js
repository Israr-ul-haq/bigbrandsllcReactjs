import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableCommonContainer from "../../../Components/Common/TableCommonContainer";

const CompetitionProduct = () => {
  const Columns = useMemo(() => {
    let arr = [];
    arr.push({
      Header: "Product Link",
      Cell: (product) => {
        return product.row.original[0] || "";
      },
    });
    arr.push({
      Header: "Free shipping",
      Cell: (product) => {
        return product.row.original[1] || "";
      },
    });
    arr.push({
      Header: "Price",
      Cell: (product) => {
        return product.row.original[2] || "";
      },
    });
    arr.push({
      Header: "Shipping price",
      Cell: (product) => {
        return product.row.original[3] || "";
      },
    });
    return arr;
  }, []);
  const productsArray = [
    ["https://dashboard.bigbrandsllc.co", "yes", 203, 378],
  ];

  console.log(productsArray);

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer closeButton={false} limit={1} />
        <Container fluid>
          <BreadCrumb title="Products" pageTitle="" />
          <Row>
            <div className="col-xl-12 col-lg-12">
              <div>
                <div className="card">
                  <div className="card-header"></div>
                  <div className="card-body pt-0">
                    {productsArray && productsArray.length > 0 ? (
                      <TableCommonContainer
                        columns={Columns}
                        data={productsArray || []}
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
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default CompetitionProduct;
