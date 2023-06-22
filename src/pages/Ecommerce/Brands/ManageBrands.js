import React, { useEffect, useMemo, useState } from "react";
import TableCommonContainer from "../../../Components/Common/TableCommonContainer";
import { ToastContainer } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { getBrandData } from "../../../store/actions";
import { isEmpty } from "lodash";
import BrandsTableContainer from "../../../Components/Common/BrandsTableContainer";

function ManageBrands() {
  const dispatch = useDispatch();

  const [BrandList, setBrandList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [productState, setProductState] = useState(undefined);
  const [tablePageSize, setTablePageSize] = useState(10);
  const [tableCurPage, setTableCurPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const { products, tableColumns, curPage, brand, brandsData } = useSelector(
    (state) => {
      return {
        products: state.Ecommerce.products,
        tableColumns: state.Ecommerce.tableColumns,
        curPage: state.Ecommerce.curPage,
        brand: state.Ecommerce.brand,
        brandsData: state.Ecommerce.brandsData,
      };
    }
  );

  console.log(brandsData, "brandsData");

  useEffect(() => {
    if (brandsData && !brandsData.length) {
      dispatch(
        getBrandData({
          page: 1,
          limit: tablePageSize,
          search: searchKey,
          enabled: productState,
        })
      );
    }
  }, [dispatch, brandsData, tableCurPage, tablePageSize, searchKey]);
  const columns = useMemo(() => {
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
      Header: "label",
      accessor: "label",
      filterable: false,
    });
    return arr;
  }, [dispatch]);

  useEffect(() => {
    setBrandList(brandsData);
  }, [brandsData]);
  useEffect(() => {
    if (!isEmpty(products)) setBrandList(brandsData);
  }, [brandsData]);

  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <ToastContainer closeButton={false} limit={1} />
          <Container fluid>
            {/* <BreadCrumb title="Vendor" pageTitle="" /> */}
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="col-xl-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          {/* <h4>Brand List</h4> */}
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      {BrandList && BrandList?.length > 0 ? (
                        <BrandsTableContainer
                          columns={columns}
                          data={brandsData || []}
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
                          navLink={"/view_brands/"}
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
        </div>
      </React.Fragment>
    </div>
  );
}

export default ManageBrands;
