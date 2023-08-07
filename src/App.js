import React, { useEffect, useState, useMemo, useContext } from "react";

//import Scss
import "./assets/scss/themes.scss";

//imoprt Route
import Route from "./Routes";
import { useSelector, useDispatch } from "react-redux";
import {
  getBrand as onGetBrand,
  getVendor as onGetVendor,
} from "./store/actions";
import { isEmpty } from "lodash";
import {  ImportStatusProvider } from "./Components/constants/ImportStatusContext";


function App() {
  const dispatch = useDispatch();
  const { brand, vendor } = useSelector((state) => {
    return {
      brand: state.Ecommerce.brand,
      vendor: state.Ecommerce.vendor,
    };
  });
  useEffect(() => {
    if (isEmpty(brand)) {
      dispatch(onGetBrand());
    }
  }, [dispatch, brand]);
  useEffect(() => {
    if (isEmpty(vendor)) {
      dispatch(onGetVendor());
    }
  }, [dispatch, vendor]);





  return (
    <React.Fragment>
      <ImportStatusProvider>
        <Route />
      </ImportStatusProvider>
    </React.Fragment>
  );
}

export default App;
