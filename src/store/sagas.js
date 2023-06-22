import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//ecommerce
import ecommerceSaga from "./ecommerce/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(ecommerceSaga)
  ]);
}
