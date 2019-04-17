import React, { useState } from "react";
import "./AddProduct.css";
import UploadPicture from "../../components/UI/UploadPicture/UploadPicture";
import UploadPictures from "../../components/UI/UploadPictures/UploadPictures";

const AddProduct = props => {
  const [inputs, setInputs] = useState({});
  const [options, setOptions] = useState({});
  const inputChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const optionsChange = e => {
    const size = [];
    if (e.target.name === "size") {
      size.push([e.target.value]);
      setOptions({
        ...options,
        size
      });
    } else {
      setOptions({
        ...options,
        [e.target.name]: e.target.value
      });
    }
  };

  const setFeaturedPicture = (name, result) => {
    // console.log(name);
    // console.log(result);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    console.log("inputs=>", inputs);
    console.log("options=>", options);
  };

  return (
    <div className="row adminAddProduct">
      <div className="col-12">
        <div className="card mb-30 text-white">
          <div className="card-body">
            <h2 className="pl-3 mb-4">Add New Product</h2>
            <form className="form-horizontal" onSubmit={onSubmitForm}>
              <div className="form-group">
                <label className="col-12">
                  <span className="label-tooltip"> Name </span>
                </label>
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        name="name"
                        className="w-100"
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-12">
                  <span className="label-tooltip"> Slug </span>
                </label>
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        name="slug"
                        className="w-100"
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-12">
                  <span className="label-tooltip"> Short Description </span>
                </label>
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <textarea
                        rows="5"
                        className="w-100"
                        name="shortDescription"
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-12">
                  <span className="label-tooltip"> Description </span>
                </label>
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <textarea
                        rows="10"
                        className="w-100"
                        name="description"
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-12">
                  <span className="label-tooltip"> Select Category </span>
                </label>
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <select
                        name="category"
                        className="w-100 p-3"
                        onChange={inputChange}
                      >
                        <option value="Sony">Sony</option>
                        <option value="Samsung"> Samsung </option>
                        <option value="LG"> LG </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-12">
                  <span className="label-tooltip"> Select Sub Category </span>
                </label>
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <select
                        name="subCategory"
                        className="w-100 p-3"
                        onChange={inputChange}
                      >
                        <option value="Sony">Sony</option>
                        <option value="Samsung"> Samsung </option>
                        <option value="LG"> LG </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="col-12">Choose Options</h2>
              <div className="form-group">
                <label className="col-12">
                  <span className="label-tooltip"> Select Color </span>
                </label>
                <div className="col-12">
                  <div className="radioButtons">
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="white"
                      />
                      <span className="checkmark white" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="yellow"
                      />
                      <span className="checkmark yellow" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="blue"
                      />
                      <span className="checkmark blue" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="green"
                      />
                      <span className="checkmark green" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="gray"
                      />
                      <span className="checkmark gray" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="purple"
                      />
                      <span className="checkmark purple" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="pink"
                      />
                      <span className="checkmark pink" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="lightblue"
                      />
                      <span className="checkmark lightblue" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="brown"
                      />
                      <span className="checkmark brown" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="red"
                      />
                      <span className="checkmark red" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="orange"
                      />
                      <span className="checkmark orange" />
                    </label>
                    <label className="radioButtonContainer">
                      <input
                        type="radio"
                        name="color"
                        onChange={optionsChange}
                        value="black"
                      />
                      <span className="checkmark black" />
                    </label>
                  </div>
                </div>
                <label className="col-12">
                  <span className="label-tooltip"> Select Sizes </span>
                </label>
                <div className="col-12">
                  <div className="label">
                    <label className="size">M</label>
                    <input
                      type="checkbox"
                      name="size"
                      value="M"
                      onChange={optionsChange}
                    />
                    <span className="label-text" />
                    <div className="options">
                      <div className="form-group mt-2">
                        <div className="row">
                          <div className="col-md-4">
                            <span className="w-100 mb-2 d-block">
                              Enter Quantity
                            </span>
                            <input
                              type="number"
                              className="w-100"
                              name="qty"
                              onChange={optionsChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <span className="w-100 mb-2 d-block">
                              Enter Price
                            </span>
                            <input
                              type="number"
                              className="w-100"
                              name="price"
                              onChange={optionsChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <span className="w-100 mb-2 d-block">
                              Enter Discount
                            </span>
                            <input
                              type="number"
                              className="w-100"
                              name="discount"
                              onChange={optionsChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label className="d-block">
                                Featured Picture
                              </label>
                              <UploadPicture
                                name="featuredPicture"
                                change={setFeaturedPicture}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label className="d-block">Upload Pictures</label>
                              <UploadPictures />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
