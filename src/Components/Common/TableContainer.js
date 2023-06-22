import React, { Fragment, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect,
} from "react-table";
import { Table, Row, Col, Button, Input, CardBody } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";

const TableContainer = ({
  columns,
  data,
  isGlobalSearch,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  handleSelectPageSize,
  handleChangePage,
  currentPage,
  setCurrentPage,
  navLink,
  totalCount,
  curPageSize,
  setPageSize,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,

    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    // state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: curPageSize,
        selectedRowIds: 0,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );
  const history = useNavigate();

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " " : "") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
    // handleSelectPageSize(Number(event.target.value));
  };
  const [statePreviousButton, setStatePreviouse] = useState(false);
  const [stateNextButton, setStateNext] = useState(false);

  const chagedPage = useMemo(() => {
    const finalPage =
      parseInt(totalCount / curPageSize) +
      (parseInt(totalCount % curPageSize) > 0 ? 1 : 0);

    if (currentPage > 1) setStatePreviouse(true);
    else setStatePreviouse(false);
    if (currentPage < finalPage) setStateNext(true);
    else setStateNext(false);
  }, [totalCount, currentPage]);

  const handlePreviouse = () => {
    previousPage();
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    nextPage();
    setCurrentPage(currentPage + 1);
  };
  return (
    <Fragment>
      <div className={divClass}>
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr
                className={trClass}
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    className={thClass}
                    {...column.getSortByToggleProps()}
                  >
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-between align-items-center p-2">
        {isGlobalSearch && (
          <Col md={4} sm={4} xs={12} className="justify-content-start">
            <div className="d-flex justify-content-start justify-content-xs-center">
              <select
                className="form-select"
                style={{ maxWidth: 150 }}
                value={curPageSize}
                onChange={(e) => onChangeInSelect(e)}
              >
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </Col>
        )}
        <Col className="col-md-auto col-sm-8">
          <Row>
            <div className="d-flex justify-content-end justify-content-xs-center">
              <Button
                color="primary"
                onClick={handlePreviouse}
                disabled={!statePreviousButton}
              >
                {"<"}
              </Button>
              <div className="col-md-auto pe-2 ps-2">
                <div className="d-flex align-items-center justify-content-center h-100">
                  Page{" "}
                  <strong>
                    {currentPage} of{" "}
                    {parseInt(totalCount / curPageSize) +
                      (parseInt(totalCount % curPageSize) > 0 ? 1 : 0)}
                  </strong>
                </div>
              </div>
              <Button
                color="primary"
                onClick={handleNext}
                disabled={!stateNextButton}
              >
                {">"}
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
