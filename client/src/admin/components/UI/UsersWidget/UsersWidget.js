import React from "react";
import classes from "./UsersWidget.module.css";

const UsersWidget = props => {
  return (
    <div className="col-xl-4 mb-30">
      <div className="card card-statistics">
        <div className="card-body text-left">
          <h5 className="card-title text-white">Members Activity</h5>
          <div className="row">
            <div className="col-6 col-sm-6 mb-30">
              <div className={classes.counter}>
                <span
                  className={classes.timer + " text-success"}
                  data-to="4905"
                  data-speed="10000"
                >
                  4905
                </span>
                <label className="text-capitalize mt-0 text-white">
                  New submissions{" "}
                </label>
              </div>
            </div>
            <div className="col-6 col-sm-6 mb-30">
              <div className={classes.counter}>
                <span
                  className={classes.timer + " text-danger"}
                  data-to="6524"
                  data-speed="10000"
                >
                  6524
                </span>
                <label className="text-capitalize mt-0 text-white">
                  New contacts
                </label>
              </div>
            </div>
          </div>
          <div className="divider" />
          <div className="row text-white">
            <div className="col-6 col-sm-4 mt-30">
              <b>Daily visitors</b>
              <p>465</p>
            </div>
            <div className="col-6 col-sm-4 mt-30">
              <b>Active</b>
              <p>9524</p>
            </div>
            <div className="col-6 col-sm-4 mt-30">
              <b>Inactive</b>
              <p>1283</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersWidget;
