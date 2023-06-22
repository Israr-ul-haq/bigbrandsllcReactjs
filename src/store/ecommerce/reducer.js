import {
  GET_PRODUCTS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_TABLE_COLUMNS,
  GET_SELECTED_ITEM,
  UPDATE_TABLE_COLUMNS,
  GET_BRAND,
  GET_VENDOR,
  UPDATE_PRODUCT,
  ADD_BRAND,
  ADD_VENDOR,
  GET_BRANDs,
} from "./actionType";

const INIT_STATE = {
  products: [],
  totalCount: null,
  curPage: 1,
  pageSize: 10,
  tableColumns: {},
  selectedItem: null,
  brand: {},
  vendor: {},
  brandsData: [],
};

const Ecommerce = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      // console.log("++++++++++", action)
      switch (action.payload.actionType) {
        case GET_PRODUCTS:
          // {
          //   const { products, items_count, curPage, pageSize } = action.payload.data;
          //   console.log("cur page", curPage, pageSize)
          //   arr = [];
          //   for (let i = 0; i < items_count; i++) {
          //     const el = { ...products[parseInt(i % products.length)] }
          //     arr.push({ ...el });
          //   }
          // }
          return {
            ...state,
            products: action.payload.data.products,
            totalCount: action.payload.data.items_count,
            curPage: action.payload.data.curPage,
            pageSize: action.payload.data.pageSize,
          };
        case GET_TABLE_COLUMNS:
          return {
            ...state,
            tableColumns: action.payload.data,
          };
        case UPDATE_TABLE_COLUMNS:
          return {
            ...state,
            tableColumns: action.payload.data,
          };
        case GET_SELECTED_ITEM:
          // console.log(action);
          return {
            ...state,
            selectedItem: action.payload.data,
          };
        case GET_BRAND: {
          let arr = {};
          if (action.payload.data.length) {
            action.payload.data.map((el) => {
              arr[el.code] = el.labels.en_US;
              return el;
            });
          }
          return {
            ...state,
            brand: arr,
          };
        }
        case GET_BRANDs: {
          return {
            ...state,
            brandsData: action.payload.data,
            // totalCount: action.payload.data.items_count,
            // curPage: action.payload.data.curPage,
            // pageSize: action.payload.data.pageSize,
          };
        }
        case ADD_BRAND: {
          let newbrand = state.brand;
          newbrand[action.payload.data.code] = action.payload.data.labels.en_US;
          return {
            ...state,
            brand: newbrand,
          };
        }
        case GET_VENDOR: {
          let arr = {};
          if (action.payload.data.length) {
            action.payload.data.map((el) => {
              arr[el.code] = el.labels.en_US;
              return el;
            });
          }
          return {
            ...state,
            vendor: arr,
          };
        }
        case ADD_VENDOR: {
          let newVendor = state.vendor;
          newVendor[action.payload.data.code] =
            action.payload.data.labels.en_US;
          return {
            ...state,
            vendor: newVendor,
          };
        }
        case UPDATE_PRODUCT: {
          // console.log("state", action.payload.data)
          let arr = state.products;
          // console.log(arr);
          arr = arr.map((el) => {
            if (el.identifier === action.payload.data.identifier) {
              return { ...el, ...action.payload.data };
            }
            return el;
          });
          // console.log(arr);
          return {
            ...state,
            products: arr,
          };
        }
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_PRODUCTS:
          return {
            ...state,
            error: action.payload.error,
          };
        default:
          return { ...state };
      }

    case GET_PRODUCTS:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default Ecommerce;
