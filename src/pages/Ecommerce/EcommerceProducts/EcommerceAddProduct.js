import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Input,
  Label,
  Form,
} from "reactstrap";
import {
  getCompetitonProductsData,
  getProductBySku,
  updateProductApi,
} from "./ProductsService";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompetitionProductsData from "./CompetitionProductsData";
import { getCompetitionData } from "../Competition/CompetitionService";

const EcommerceAddProduct = () => {
  document.title = "View Product | Abe's Website";
  const { sku } = useParams();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
  const [competeData, setCompeteData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoader(true);
    const response = await getProductBySku(sku);

    const websiteIds = response.competitionData.map((data) => data.websiteId);

    const competition = await getCompetitonProductsData({
      brandId: response.Brand,
      websiteId: websiteIds,
      productId: sku,
    });

    if (competition.status === 201) {
      const updatedCompetition = competition.data.map((compData) => {
        const matchingData = response.competitionData.find(
          (data) => data.websiteId === compData.websiteId
        );
        if (matchingData) {
          return { ...compData, name: matchingData.name };
        }
        return compData;
      });

      // Find the unmatched objects in response.competitionData
      const remainingData = response.competitionData.filter(
        (data) =>
          !updatedCompetition.some(
            (compData) => compData.websiteId === data.websiteId
          )
      );

      // Add the remaining objects to the updatedCompetition array
      const finalCompetitionData = [...updatedCompetition, ...remainingData];

      setCompeteData(finalCompetitionData);
    } else {
      setCompeteData(response.competitionData);
    }

    if (response) {
      setData(response);

      console.log(response);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const feeNames = data?.AdditionalFee?.map((item) => item.feeName);
  const feeNamesString = feeNames?.join(", ");

  const feePrices = data?.AdditionalFee?.map((item) => item.price).filter(
    (price) => price !== ""
  );

  const feeCal = data?.AdditionalFee?.map(
    (item) => item.calculatedPriceFromNetCost
  ).filter((calculatedPriceFromNetCost) => calculatedPriceFromNetCost !== "");

  const feePricesString = feePrices?.join(", ");
  const feeCalString = feeCal?.join(", ");
  const combinedString = [feePricesString, feeCalString]
    .filter(Boolean)
    .join(", ");
  console.log(combinedString);

  // const feeCal = data?.AdditionalFee?.map((item) => {
  //   const calculatedPriceFromNetCost = Number.parseFloat(item.calculatedPriceFromNetCost);
  //   return Number.isNaN(calculatedPriceFromNetCost) ? "" : calculatedPriceFromNetCost.toFixed(2);
  // }).filter((calculatedPriceFromNetCost) => calculatedPriceFromNetCost !== "");

  // const feePricesString = feePrices?.join(", ");
  // const feeCalString = feeCal?.join(", ");
  // const combinedString = [feePricesString, feeCalString]
  //   .filter(Boolean)
  //   .join(", ");
  // console.log(combinedString);

  return (
    <div className="page-content">
      <Container fluid>
        <ToastContainer closeButton={false} limit={1} />
        <BreadCrumb title="View Product" pageTitle="" />
        <Row>
          <Col md={6}>
            <Form>
              <Card style={{ height: "505px" }}>
                <CardBody>
                  <Row>
                    <Col sm={12} md={4} lg={4} xl={4}></Col>
                    <Col sm={12} md={8} lg={12} xl={8} className="mb-3 mt-4">
                      <h4>{data?.Product_Name}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={4} lg={4} xl={4}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          src={data?.image}
                          alt=""
                          className="img-fluid d-block"
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={8} lg={8} xl={8}>
                      <div className="mb-3">
                        <Label className="form-label">Product SKU</Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Enter product SKU"
                          name="identifier"
                          value={data?.SKU}
                          onBlur={""}
                          onChange={""}
                          invalid={""}
                          autoComplete="none"
                          readOnly
                        />
                      </div>

                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Brand
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Enter product Brand"
                          name="values.Brand[0].data"
                          value={data?.Brand}
                          onBlur={""}
                          onChange={""}
                          invalid={""}
                          autoComplete="none"
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Product Type
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Enter product title"
                          name="values.Product_Type[0].data"
                          value={data?.Product_Type}
                          onBlur={""}
                          onChange={""}
                          invalid={""}
                          readOnly
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Form>
          </Col>
          <Col md={6}>
            <Row>
              <Col>
                <div className="col-xl-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <BreadCrumb title="Shipping Section" pageTitle="" />
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-3">
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor=" Shipping-Method"
                              className="form-label"
                            >
                              Shipping Method
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Shipping Method"
                              value={data?.Shipping_Method}
                              readOnly
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping Weight"
                              className="form-label"
                            >
                              Shipping Weight
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Shipping Weight"
                              value={data?.Shipping_Weight}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping-Width"
                              className="form-label"
                            >
                              Shipping Width
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              value={data?.Shipping_Width}
                              readOnly
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping-Depth"
                              className="form-label"
                            >
                              Shipping Depth
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Shipping-Depth"
                              value={data?.Shipping_Depth}
                              placeholder="Shipping Depth"
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping-Height"
                              className="form-label"
                            >
                              Shipping Height
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Shipping-Height"
                              value={""}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Freight-Class"
                              className="form-label"
                            >
                              Freight Class
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Freight-Class"
                              placeholder="Freight Class "
                              value={data?.Freight_Class}
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <div className="d-flex ">
                              <Label
                                htmlFor="readonlyInput"
                                className="form-label"
                              >
                                Shipping Cost
                              </Label>
                              {data?.isShipping_Cost === "true" && (
                                <div className="form-label">
                                  (Free shipping for customer)
                                </div>
                              )}
                            </div>
                            <div className="form-icon">
                              <Input
                                type="text"
                                className="form-control"
                                id="Pricing-Category"
                                placeholder="Pricing Category"
                                value={
                                  data?.isShipping_Cost === "true"
                                    ? "$" + data.Shipping_Cost
                                    : ""
                                }
                                readOnly
                              />
                            </div>
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="iconrightInput"
                              className="form-label"
                            >
                              Additional Fee Name
                            </Label>
                            <div className="form-icon right">
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Additional Fee Name"
                                value={feeNamesString}
                              />
                            </div>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="mb-3">
                            <Label
                              htmlFor="iconrightInput"
                              className="form-label"
                            >
                              Additional Fee
                            </Label>
                            <div className="form-icon right">
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Additional Fee"
                                value={combinedString}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Row>
              <Col>
                <div className="col-xl-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <BreadCrumb title="Pricing Section" pageTitle="" />
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-3">
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Pricing-Category"
                              className="form-label"
                            >
                              Pricing Category
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Pricing-Category"
                              placeholder="Pricing Category"
                              value={data?.Pricing_Category}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor="Price" className="form-label">
                              Price
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Price"
                              placeholder="Price"
                              value={
                                data?.Price
                                  ? "$" +
                                    Number.parseFloat(
                                      data?.Price === "" ? 0 : data?.Price
                                    ).toFixed(2)
                                  : ""
                              }
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Profit-Margin"
                              className="form-label"
                            >
                              Profit Margin (not including payment processing
                              fees)
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Profit-Margin"
                              placeholder="Profit Margin"
                              value={
                                data?.ProfitMargin
                                  ? Number.parseFloat(
                                      data.ProfitMargin
                                    ).toFixed(2) + "%"
                                  : ""
                              }
                              readOnly
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor=" List-Price" className="form-label">
                              List Price
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="List Price"
                              value={
                                "$" +
                                Number.parseFloat(
                                  data?.List_Price === "" ? 0 : data?.List_Price
                                ).toFixed(2)
                              }
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping-Cost"
                              className="form-label"
                            >
                              {data?.isAkeneo_NetCost_Discount === "true"
                                ? "Net Price - From Akeneo"
                                : `Net Price - ${data?.Net_Cost_percentage} from list price`}
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              value={
                                data?.isAkeneo_NetCost_Discount === "true"
                                  ? "$" +
                                    Number.parseFloat(
                                      data?.Net_Cost === "" ? 0 : data?.Net_Cost
                                    ).toFixed(2)
                                  : "$" +
                                    Number.parseFloat(
                                      data?.Dealer_NetCost_Discount === ""
                                        ? 0
                                        : data?.Dealer_NetCost_Discount
                                    ).toFixed(2)
                              }
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping-Cost"
                              className="form-label"
                            >
                              {data?.MAP_Policy === "false"
                                ? "Map Price - None"
                                : data?.isAkeneo_MapDiscount === "true"
                                ? "Map Price - From Akeneo"
                                : `Map Price - ${data?.Map_Price_percentage} from list price`}
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              value={
                                data?.MAP_Policy === "false"
                                  ? ""
                                  : data?.isAkeneo_MapDiscount === "true"
                                  ? "$" +
                                    Number.parseFloat(
                                      data?.MAP_Price === ""
                                        ? 0
                                        : data?.MAP_Price
                                    ).toFixed(2)
                                  : "$" +
                                    Number.parseFloat(
                                      data?.Dealer_MapPrice === ""
                                        ? 0
                                        : data?.Dealer_MapPrice
                                    ).toFixed(2)
                              }
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor="Map-Policy" className="form-label">
                              Map Policy
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Pricing-Category"
                              placeholder="Pricing Category"
                              value={data?.MAP_Policy === "true" ? "yes" : "no"}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Annual Rebate"
                              className="form-label"
                            >
                              Quarterly Rebate{" "}
                              {data?.is_Quarterly_Rebate === "false"
                                ? "- None"
                                : data?.is_Quarterly_Volume_Based_Rebate ===
                                  "false"
                                ? `(Non Volume based - ${
                                    data?.Quarterly_Rebate_Percentage + "%"
                                  })`
                                : "Voulme based"}
                            </Label>
                            <div className="form-icon right">
                              <Input
                                type="text"
                                className="form-control "
                                value={
                                  data?.is_Quarterly_Rebate === "false"
                                    ? ""
                                    : data?.Quarterly_Rebate
                                    ? "$" +
                                      Number.parseFloat(
                                        data?.Quarterly_Rebate === " "
                                          ? 0
                                          : data?.Quarterly_Rebate
                                      ).toFixed(2)
                                    : ""
                                }
                                placeholder="Quarterly Rebate"
                                readOnly
                              />
                            </div>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Annual Rebate"
                              className="form-label"
                            >
                              Annual Rebate
                              {data?.is_Annual_Rebate === "false"
                                ? "- None"
                                : data?.is_Annual_Volume_Based_Rebate ===
                                  "false"
                                ? `(Non Volume based - ${
                                    data?.Annual_Rebate_Percentage + "%"
                                  })`
                                : "Voulme based"}
                            </Label>
                            <div className="form-icon right">
                              <Input
                                type="text"
                                className="form-control "
                                placeholder="Annual Rebate"
                                readOnly
                                value={
                                  data?.is_Annual_Rebate === "false"
                                    ? ""
                                    : data?.Annual_Rebate
                                    ? "$" +
                                      Number.parseFloat(
                                        data?.Annual_Rebate === ""
                                          ? 0
                                          : data?.Annual_Rebate
                                      ).toFixed(2)
                                    : ""
                                }
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <CompetitionProductsData
          productsData={data}
          setProductsData={setData}
          competeData={competeData}
          setCompeteData={setCompeteData}
        />
      </Container>
    </div>
  );
};

export default EcommerceAddProduct;
