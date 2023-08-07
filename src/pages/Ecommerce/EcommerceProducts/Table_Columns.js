import { Link, useNavigate } from "react-router-dom";

import React from "react";
import { updateProductStatus } from "./FiltersService";
import { set_selected_products } from "./ProductsService";
import { baseUrl, imageBaseURl } from "../../../helpers/baseUrl";

function Columns({ setProductList, setAkeneoSelectedProducts }) {
  const handleCheckboxChange = async (e, id) => {
    setProductList((prevProductList) => {
      return prevProductList.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            akeneoStatus: e.target.checked,
          };
        }
        return product;
      });
    });

    const updateStatus = await updateProductStatus({
      id: id,
      akeneoStatus: e.target.checked,
    });

    if (updateStatus) {
      console.log(updateStatus);
      setAkeneoSelectedProducts((prev) => {
        if (e.target.checked) {
          const updatedProducts = {
            id: updateStatus.id,
            identifier: updateStatus.SKU,
            price: updateStatus.Price ? updateStatus.Price : 0,
            compare_at_price: updateStatus.Compare_at_price
              ? updateStatus.Compare_at_price
              : 0,
            Free_Shipping: Boolean(updateStatus.isShipping_Cost),
          };

          // Append the updated response to the previous state
          return [...prev, updatedProducts];
        } else {
          // Remove the object with matching id from the previous state
          return prev.filter((product) => product.id !== id);
        }
      });
    }
  };

  const columnsData = [
    {
      Header: "Select",
      accessor: "Select",
      Cell: (product) => {
        return (
          <>
            <label>
              <input
                className="check_box_input"
                checked={product?.row?.original?.akeneoStatus}
                onChange={(e) =>
                  handleCheckboxChange(e, product.row.original.id)
                }
                type="checkbox"
              />
            </label>
          </>
        );
      },
    },
    {
      Header: "Thumbnail",
      Cell: (product) => {
        const { image } = product.row.original;
        return (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm bg-transparent rounded p-1">
                  <img src={`${image}`} alt="" className="img-fluid d-block" />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    {
      Header: "Brand",
      accessor: "Brand",
      filterable: false,
    },

    {
      Header: "SKU",
      accessor: "SKU",
      filterable: false,
    },

    {
      Header: "Product Type",
      accessor: "Product_Type",
      filterable: false,
    },
    {
      Header: "Product Name",
      accessor: "Product_Name",
      filterable: false,
    },

    {
      Header: "Pricing Category",
      accessor: "Pricing_Category",
      filterable: false,
    },

    {
      Header: "Shipping Method",
      accessor: "Shipping_Method",
      filterable: false,
    },

    {
      Header: "Freight class",
      accessor: "Freight_Class",
      filterable: false,
    },
    {
      Header: "Shipping Weight",
      accessor: "Shipping_Weight",
      filterable: false,
    },
    {
      Header: "Shipping Width",
      accessor: "Shipping_Width",
      filterable: false,
    },

    {
      Header: "Shipping Depth",
      accessor: "Shipping_Depth",
      filterable: false,
    },

    {
      Header: "Shipping Height",
      accessor: "Shipping_Height",
      filterable: false,
    },
    {
      Header: "Shipping Cost",
      accessor: "Shipping_Cost",
      filterable: false,
      // Cell: ({ row }) => {
      //   const data = row.original;
      //   const cost =
      //     data.Shipping_Cost !== undefined
      //       ? "$" +
      //         Number.parseFloat(
      //           data?.Shipping_Cost === "" ? 0 : data?.Shipping_Cost
      //         ).toFixed(2)
      //       : "";

      //   return <span>{cost}</span>;
      // },

      Cell: ({ row }) => {
        const data = row.original;
        const cost =
          data.Shipping_Cost !== undefined ? (
            data?.isShipping_Cost === "true" ? (
              data?.Shipping_Cost === "" || data?.Shipping_Cost === "0" ? (
                <span style={{ color: "red" }}>$0.00</span>
              ) : (
                "$" + Number.parseFloat(data?.Shipping_Cost || 0).toFixed(2)
              )
            ) : (
              <span>Free shipping - No </span>
            )
          ) : (
            <span style={{ color: "red" }}>$0.00</span>
          );

        return <span>{cost}</span>;
      },
    },

    {
      Header: "List Price",
      accessor: "List_Price",
      filterable: false,
      // Cell: ({ row }) => {
      //   const data = row.original;
      //   const listPrice =
      //     data.List_Price !== undefined
      //       ? "$" +
      //         Number.parseFloat(
      //           data?.List_Price === "" ? 0 : data?.List_Price
      //         ).toFixed(2)
      //       : "";

      //   return <span>{listPrice}</span>;
      // },

      Cell: ({ row }) => {
        const data = row.original;
        const listPrice =
          data.List_Price !== undefined ? (
            data?.List_Price === "" ? (
              <span style={{ color: "red" }}>$0.00</span>
            ) : (
              "$" + Number.parseFloat(data?.List_Price).toFixed(2)
            )
          ) : (
            <span style={{ color: "red" }}>$0.00</span>
          );

        return <span>{listPrice}</span>;
      },
    },

    {
      Header: "Net Price",
      accessor: "Net_Cost",
      filterable: false,
      // Cell: ({ row }) => {
      //   const data = row.original;
      //   const netPrice =
      //     data?.isAkeneo_NetCost_Discount === "true"
      //       ? "$" +
      //         Number.parseFloat(
      //           data?.Net_Cost === "" ? 0 : data?.Net_Cost
      //         ).toFixed(2)
      //       : "$" +
      //         Number.parseFloat(
      //           data.Dealer_NetCost_Discount === ""
      //             ? 0
      //             : data.Dealer_NetCost_Discount
      //         ).toFixed(2);

      //   return <span>{netPrice}</span>;
      // },

      Cell: ({ row }) => {
        const data = row.original;
        const netPrice =
          data?.isAkeneo_NetCost_Discount === "true" ? (
            data?.Net_Cost === "" ? (
              <span style={{ color: "red" }}>$0.00</span>
            ) : (
              "$" + Number.parseFloat(data?.Net_Cost).toFixed(2)
            )
          ) : data?.Dealer_NetCost_Discount === "" ? (
            <span style={{ color: "red" }}>$0.00</span>
          ) : (
            "$" + Number.parseFloat(data?.Dealer_NetCost_Discount).toFixed(2)
          );

        return <span>{netPrice}</span>;
      },
    },

    {
      Header: "Map Price",
      accessor: "MAP_Price",
      filterable: false,
      // Cell: ({ row }) => {
      //   const data = row.original;
      //   const mapPrice =
      //     data.MAP_Policy === "false"
      //       ? ""
      //       : data.isAkeneo_MapDiscount === "true"
      //       ? "$" + Number.parseFloat(data.MAP_Price || 0).toFixed(2)
      //       : "$" + Number.parseFloat(data.Dealer_MapPrice || 0).toFixed(2);

      //   return <span>{mapPrice}</span>;
      // },

      Cell: ({ row }) => {
        const data = row.original;
        const mapPrice =
          data.MAP_Policy === "false" ? (
            ""
          ) : data.isAkeneo_MapDiscount === "true" ? (
            data.MAP_Price === "" || data.MAP_Price === "0" ? (
              <span style={{ color: "red" }}>$0.00</span>
            ) : (
              "$" + Number.parseFloat(data.MAP_Price || 0).toFixed(2)
            )
          ) : data.Dealer_MapPrice === "" || data.Dealer_MapPrice === "0" ? (
            <span style={{ color: "red" }}>$0.00</span>
          ) : (
            "$" + Number.parseFloat(data.Dealer_MapPrice || 0).toFixed(2)
          );

        return <span>{mapPrice}</span>;
      },
    },

    {
      Header: "Annual Rebate",
      accessor: "Annual_Rebate",
      filterable: false,
      Cell: ({ row }) => {
        const data = row.original;
        const annualRebate =
          data.is_Annual_Rebate === "false"
            ? ""
            : data.Annual_Rebate !== undefined
            ? "$" +
              Number.parseFloat(
                data.Annual_Rebate === "" ? 0 : data.Annual_Rebate
              ).toFixed(2)
            : "";

        return <span>{annualRebate}</span>;
      },
    },

    {
      Header: "Quarterly Rebate",
      accessor: "Quarterly_Rebate",
      filterable: false,
      Cell: ({ row }) => {
        const data = row.original;
        const quarterlyRebate =
          data.is_Quarterly_Rebate === "false"
            ? ""
            : data.Quarterly_Rebate !== undefined
            ? "$" +
              Number.parseFloat(
                data.Quarterly_Rebate === "" ? 0 : data.Quarterly_Rebate
              ).toFixed(2)
            : "";

        return <span>{quarterlyRebate}</span>;
      },
    },
    {
      Header: "Price",
      accessor: "Price",
      filterable: false,
      Cell: ({ row }) => {
        const data = row.original;
        const Price =
          data.Price !== undefined
            ? "$" + Number.parseFloat(data?.Price).toFixed(2)
            : "";

        return <span>{Price}</span>;
      },
    },

    {
      Header: "Profit Margin",
      accessor: "ProfitMargin",
      filterable: false,
      Cell: ({ row }) => {
        const data = row.original;
        const profitMargin =
          data.ProfitMargin !== undefined
            ? Number.parseFloat(data.ProfitMargin).toFixed(2) + "%"
            : "";

        return <span>{profitMargin}</span>;
      },
    },

    {
      Header: "Actions",
      accessor: "actions",
      Cell: (product) => {
        return (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <Link
                  type="button"
                  to={"/view-product/" + product?.row.original?.SKU}
                  className="btn btn-success"
                >
                  View
                </Link>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return {
    columnsData,
  };
}

export default Columns;
