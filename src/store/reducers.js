import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

//Ecommerce
import Ecommerce from "./ecommerce/reducer";


const rootReducer = combineReducers({
    // public
    Layout,
    Ecommerce,
});

export default rootReducer;