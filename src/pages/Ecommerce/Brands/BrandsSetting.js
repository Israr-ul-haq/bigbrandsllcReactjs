import React, { useEffect, useState } from "react";
import { getCompetitionData } from "../Competition/CompetitionService";
import { Col, Container, Row } from "reactstrap";
import { updateBrandsSetting } from "./BrandsService";
import Select from "react-select";
import { toast } from "react-toastify";

function BrandsSetting({ id, PricingList, selectedSource }) {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [addedData, setAddedData] = useState([]);
  const [btnLock, setBtnLock] = useState(false);

  const onSubmit = async () => {
    setBtnLock(true);

    const finalData = addedData.map((i) => {
      return {
        websiteId: i.value,
        name: i.label,
        website: i.website,
      };
    });

    const response = await updateBrandsSetting(
      {
        competitionData: finalData,
      },
      id,
      selectedSource
    );
    if (response) {
      toast.success("data save successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setBtnLock(false);
    } else {
      toast.error("something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setBtnLock(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoader(true);
    setTimeout(async () => {
      const response = await getCompetitionData();
      if (response) {
        setData(response);
        setLoader(false);
      } else {
        setLoader(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const defaultSelectedOptions = PricingList[0]?.competitionData.map(
      (item) => ({
        value: item.websiteId,
        label: item.name,
        website: item.website,
      })
    );
    setAddedData(defaultSelectedOptions);
  }, [PricingList]);

  const options = data?.map((item) => ({
    value: item.id,
    label: item.name,
    website: item.website,
  }));

  const handleChange = (selectedOptions) => {
    setAddedData(selectedOptions);
  };

  const handleRemove = (removedOption) => {
    setAddedData((prevData) =>
      prevData.filter((option) => option.value !== removedOption.value)
    );
  };

  return (
    <div>
      <div className="">
        <Container fluid>
          {/* <BreadCrumb title="Vendor" pageTitle="" /> */}
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h4>Brand Settings</h4>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => onSubmit(e)}
                        className="btn btn-success"
                        style={{ width: "120px" }}
                        disabled={btnLock}
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="card-body pt-0">
                    <div className="pt-3 ">
                      {/* <select
                        name="brand"
                        id="brand"
                        className="form-control w-100"
                        style={{ width: "unset" }}
                        onChange={(e) => handleBrandChange(e.target.value)}
                      >
                        <option value="">Select a brand</option>
                        {data?.map((brand) => {
                          if (brand.id === PricingList[0]?.websiteId) {
                            return (
                              <option value={brand.id} selected key={brand.id}>
                                {brand.name}
                              </option>
                            );
                          } else {
                            return (
                              <option value={brand.id} key={brand.id}>
                                {brand.name}
                              </option>
                            );
                          }
                        })}
                      </select> */}

                      <Select
                        isMulti
                        options={options}
                        onChange={handleChange}
                        value={addedData}
                        components={{
                          MultiValueRemove: ({ innerProps, data }) => (
                            <span
                              {...innerProps}
                              onClick={() => handleRemove(data)}
                            >
                              &times;
                            </span>
                          ),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default BrandsSetting;
