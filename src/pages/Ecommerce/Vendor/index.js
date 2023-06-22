import React, { useEffect, useState, useMemo } from "react";

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
import axios from "axios";

import "nouislider/distribute/nouislider.css";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableCommonContainer from "../../../Components/Common/TableCommonContainer";
//Import actions
import { getProducts as onGetProducts, getTableColumns as onGetTableColumns, updateTableColumns as onUpdateTableColumns, getItems as onGetSelectedItem, getBrand as onGetBrand, updateProduct as onUpdateProduct, addBrand as onAddBrand, addVendor as onAddVendor } from "../../../store/ecommerce/action";
import { isEmpty } from "lodash";
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";


const VendorProducts = (props) => {
    const dispatch = useDispatch();
    const { brand, vendor } = useSelector(state => {
        return {
            brand: Object.entries(state.Ecommerce.brand),
            vendor: Object.entries(state.Ecommerce.vendor)
        }
    })
    const [brandModal, setBrandModal] = useState(false);
    const [vendorModal, setVendorModal] = useState(false);
    const [addBrandLabel, setAddBrandLabel] = useState("");
    const [addBrandCode, setAddBrandCode] = useState("");
    const [addVendorLavel, setAddVendorLabel] = useState("");
    const [addVendorCode, setAddVendorCode] = useState("");
    document.title = "Vendor | Abe's Web";
    const columns = useMemo(
        () => {
            let arr = [];
            arr.push({
                Header: "#",
                Cell: (cell) => {
                    return <input type="checkbox" className="productCheckBox form-check-input" />;
                },
            });
            arr.push({
                Header: "Label",
                Cell: (product) => {
                    return product.row.original[1] || ""
                }
            })
            arr.push({
                Header: "Code",
                Cell: (product) => {
                    return product.row.original[0] || ""
                }
            })
            return arr;
        },
        []
    );
    const categoryColumns = useMemo(
        () => {
            let arr = [];
            arr.push({
                Header: "#",
                Cell: (cell) => {
                    return <input type="checkbox" className="productCheckBox form-check-input" />;
                },
            });
            arr.push({
                Header: "Label",
                Cell: (product) => {
                    return product.row.original[1] || ""
                }
            })
            arr.push({
                Header: "Code",
                Cell: (product) => {
                    return product.row.original[0] || ""
                }
            })
            return arr;
        },
        []
    );
    const toggleBrandModal = () => {
        setBrandModal(!brandModal);
    }
    const toggleVendorModal = () => {
        setVendorModal(!vendorModal);
    }
    const handleBrandDialogClose = () => {
        validation.resetForm();
        setBrandModal(false);
    }
    const handleBrandDialogSave = () => {
        dispatch(onAddBrand({ code: validation.values.code, attribute: "Brand", labels: { en_US: validation.values.label } }));
        validation.resetForm();
        setBrandModal(false);
    }
    const handleVendorDialogClose = () => {
        vendorValidation.resetForm();
        setVendorModal(false);
    }
    const handleVendorDialogSave = () => {
        dispatch(onAddVendor({ code: vendorValidation.values.code, attribute: "Pricing_Category", labels: { en_US: vendorValidation.values.label } }));
        vendorValidation.resetForm();
        setVendorModal(false);
    }
    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            label: "",
            code: "",
        },
        validationSchema: Yup.object({
            identifier: Yup.string().required("please Enter a Product SKU"),
        }),
        onSubmit: (values) => {
            console.log("submit function");
        }
    });
    const vendorValidation = useFormik({
        enableReinitialize: true,

        initialValues: {
            label: "",
            code: "",
        },
        validationSchema: Yup.object({
            identifier: Yup.string().required("please Enter a Product SKU"),
        }),
        onSubmit: (values) => {
            console.log("submit function");
        }
    });
    if (brand.length === 0)
        return (
            <Navigate to={{ pathname: "/" }} />
        );
    return (
        <React.Fragment>
            <div className="page-content">
                <ToastContainer closeButton={false} limit={1} />
                <Container fluid>
                    <BreadCrumb title="Vendor" pageTitle="" />
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="col-xl-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <h4>Brand List</h4>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <button className="btn btn-success btn-sm" onClick={toggleBrandModal}>+ Add Brand</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body pt-0">
                                        {brand && brand.length > 0 ? (
                                            <TableCommonContainer
                                                columns={columns}
                                                data={(brand || [])}
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
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="col-xl-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <h4>Product Categories</h4>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <button className="btn btn-success btn-sm" onClick={toggleVendorModal}>+ Add Category</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body pt-0">
                                        {vendor && vendor.length > 0 ? (
                                            <TableCommonContainer
                                                columns={categoryColumns}
                                                data={(vendor || [])}
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
                isOpen={brandModal}
                role="dialog"
                autoFocus={true}
                centered
                id="addBrandModal"
                toggle={toggleBrandModal}
            >
                <ModalHeader
                    toggle={() => {
                        handleBrandDialogClose();
                    }}
                >
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <div className="mb-3">
                            <Label className="form-label" htmlFor="product-title-input">
                                Brand Label
                            </Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="product-brand-label"
                                placeholder="Enter Brand Label"
                                name="label"
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                value={validation.values.label}
                                autoComplete="none"
                            />
                        </div>
                        <div className="mb-3">
                            <Label className="form-label" htmlFor="product-title-input">
                                Brand Code
                            </Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="product-brand-label"
                                placeholder="Enter Brand Code"
                                name="code"
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                value={validation.values.code}
                                autoComplete="none"
                            />
                        </div>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => {
                            handleBrandDialogClose();
                        }}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            handleBrandDialogSave();
                        }}
                    >
                        Save
                    </button>
                </ModalFooter>
            </Modal>
            {/* modal Add Vendor */}
            <Modal
                isOpen={vendorModal}
                role="dialog"
                autoFocus={true}
                centered
                id="addBrandModal"
                toggle={toggleVendorModal}
            >
                <ModalHeader
                    toggle={() => {
                        handleVendorDialogClose();
                    }}
                >
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <div className="mb-3">
                            <Label className="form-label" htmlFor="product-title-input">
                                Category Label
                            </Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="product-brand-label"
                                placeholder="Enter Brand Label"
                                name="label"
                                onBlur={vendorValidation.handleBlur}
                                onChange={vendorValidation.handleChange}
                                value={vendorValidation.values.label}
                                autoComplete="none"
                            />
                        </div>
                        <div className="mb-3">
                            <Label className="form-label" htmlFor="product-title-input">
                                Category Code
                            </Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="product-brand-label"
                                placeholder="Enter Brand Code"
                                name="code"
                                onBlur={vendorValidation.handleBlur}
                                onChange={vendorValidation.handleChange}
                                value={vendorValidation.values.code}
                                autoComplete="none"
                            />
                        </div>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => {
                            handleVendorDialogClose();
                        }}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            handleVendorDialogSave();
                        }}
                    >
                        Save
                    </button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default VendorProducts;
