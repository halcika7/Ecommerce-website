import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import classes from "./Brand.module.css";
import SmallSpinner from "../../../users/components/UI/SmallSpinner/SmallSpinner";
import ResponseMessages from "../../../users/components/UI/ResponseMessages/ResponseMessages";
import LoginRegisterInputs from "../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs";

const Brand = props => {
  const [brandName, setBrandName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    startFunction();
  }, []);
  useEffect(() => {
    startFunction();
  }, [props.addbrand, props.viewbrand, props.editbrand]);
  useEffect(() => {
    setBrandName(props.brand.brandData.name);
    setSelectedCategories(props.brand.brandData.categories);
  }, [props.brand.brandData]);
  useEffect(() => {
    if (props.brand.errorID) {
      setTimeout(() => props.history.goBack(), 6000);
    }
  }, [props.brand.errorID]);

  const checkBoxOnChange = (e, value) => {
    const newSelectedCategories = [...selectedCategories];
    if (e.target.checked) {
      newSelectedCategories.push(value);
    } else {
      const index = newSelectedCategories.findIndex(categ => categ === value);
      newSelectedCategories.splice(index, 1);
    }
    setSelectedCategories(newSelectedCategories);
  };

  const submitData = e => {
    e.preventDefault();
    const data = { name: brandName, categories: selectedCategories };
    if (props.editbrand) {
      const id = new URLSearchParams(props.location.search).get("id");
      props.editBrand(id, data);
    } else {
      props.addBrand(data);
    }
    setBrandName("");
    setSelectedCategories([]);
  };

  const startFunction = () => {
    if (!props.addbrand) {
      const id = new URLSearchParams(props.location.search).get("id");
      props.getBrand(id);
    }
    if (props.addbrand) {
      props.clearState();
    }
    props.getAllCategories();
  };

  return (
    <div className={"AdminProfile row"}>
      {props.brand.failedMessage && (
        <ResponseMessages
          message={props.brand.failedMessage}
          ClassName="Danger"
        />
      )}
      {props.brand.errorID && (
        <ResponseMessages message={props.brand.errorID} ClassName="Danger" />
      )}
      {props.brand.successMessage && (
        <ResponseMessages message={props.brand.successMessage} />
      )}
      <div className={"col-12 mb-30"}>
        {props.brand.loading || props.brand.errorID ? (
          <div className={"card bg-white"}>
            <SmallSpinner />
          </div>
        ) : (
          <React.Fragment>
            <div className="Card card text-white">
              <div className="card-header">
                {props.addbrand && <h4 className="text-white">Add Brand</h4>}
                {props.viewbrand && (
                  <h4 className="text-white">{brandName} Brand</h4>
                )}
                {props.editbrand && <h4 className="text-white">Edit Brand</h4>}
              </div>
              <div className="card-body">
                <div className="col-12">
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <label className="text-white">Brand Name</label>
                        <LoginRegisterInputs
                          type="text"
                          placeholder="Brand Name"
                          inputClass="form-control"
                          invalidInput="invalid"
                          invalidFeedback="invalid-feedback"
                          value={brandName}
                          onChange={e => setBrandName(e.target.value)}
                          error={props.brand.error ? props.brand.error : ""}
                          disabled={props.viewbrand}
                        />
                      </div>
                      <div className="col-12 mb-20">
                        <label>Choose Categories for Brand</label>
                        <div className={classes.checkBoxWrapper}>
                          {props.addbrand &&
                            props.categories.map(category => (
                              <div
                                className={classes.checkbox}
                                key={category._id}
                              >
                                <input
                                  type="checkbox"
                                  onChange={e =>
                                    checkBoxOnChange(e, category.name)
                                  }
                                />
                                <label>{category.name}</label>
                              </div>
                            ))}
                          {props.viewbrand &&
                            selectedCategories.map((category, index) => (
                              <div className={classes.checkbox} key={index}>
                                <input
                                  type="checkbox"
                                  value={category}
                                  defaultChecked={true}
                                  disabled={true}
                                />
                                <label>{category}</label>
                              </div>
                            ))}
                          {props.editbrand &&
                            props.categories.map(category => {
                              const find = selectedCategories.find(
                                cat => category.name === cat
                              );
                              return (
                                <div
                                  className={classes.checkbox}
                                  key={category._id}
                                >
                                  <input
                                    type="checkbox"
                                    onClick={e =>
                                      checkBoxOnChange(e, category.name)
                                    }
                                    defaultChecked={find}
                                  />
                                  <label>{category.name}</label>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    {!props.viewbrand && (
                      <button className="btn btn-sm mt-20" onClick={submitData}>
                        {props.addbrand ? "Add New Brand" : "Update Brand"}
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.category.allCategories,
    brand: state.brand
  };
};

const maDispatchToProps = dispatch => {
  return {
    getAllCategories: () => dispatch(actions.getAllCategories()),
    addBrand: brandData => dispatch(actions.addBrand(brandData)),
    getBrand: id => dispatch(actions.getBrand(id)),
    editBrand: (id, data) => dispatch(actions.editBrand(id, data)),
    clearState: () => dispatch(actions.clearBrandState())
  };
};

export default connect(
  mapStateToProps,
  maDispatchToProps
)(Brand);
