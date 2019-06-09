import React from "react";

const BestSellingWidget = ({ products }) => {
  return (
    <div className="col-xl-4 mb-30">
      <div className="card card-statistics h-100">
        <div className="card-body">
          <h5 className="card-title text-white">Best Selling Items</h5>
          <ul className="list-unstyled">
            {products.map((product, index) => 
              <li className="mb-20" key={index}>
                <div className="media">
                  <div className="position-relative">
                    <img
                      className="img-fluid mr-15 avatar-small"
                      src={'/'+product.featuredPicture}
                      alt={product.name}
                    />
                  </div>
                  <div className="media-body  text-white">
                    <h6 className="mt-0 mb-0">
                      {product.name}{" "}
                      <span className="float-right text-danger">{product.numberOfsales}</span>{" "}
                    </h6>
                    <p>Brand: {product.brand} </p>
                    <p>Category: {product.category} </p>
                  </div>
                </div>
                <div className="divider dotted mt-20" />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BestSellingWidget;
