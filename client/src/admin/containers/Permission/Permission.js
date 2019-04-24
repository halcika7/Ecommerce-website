import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import ResponseMessage from "../../../users/components/UI/ResponseMessages/ResponseMessages";
import SmallSpinner from "../../../users/components/UI/SmallSpinner/SmallSpinner";

const Permission = props => {
  const [permission, setPermission] = useState("");
  const [modelNames, setModelNames] = useState([]);
  useEffect(() => {
    props.getAllModelNames();
    setPermission(props.permissions.permission);
    setModelNames(props.permissions.modelNames);
  }, []);
  useEffect(() => {
    setPermission(props.permissions.permission);
    setModelNames(props.permissions.modelNames);
  }, [props.permissions]);
  useEffect(() => {
    if (props.permissions.error) {
      setTimeout(() => {
        props.history.goBack();
      }, 4000);
    }
  }, [props.permissions.error]);
  const formSubmit = e => {
    e.preventDefault();
    props.addPermission(permission);
  };

  return (
    <div className="AdminProfile row">
      {props.permissions.successMessage ? (
        <ResponseMessage message={props.permissions.successMessage} />
      ) : null}
      {props.permissions.failedMessage ? (
        <ResponseMessage
          ClassName="Danger"
          message={props.permissions.failedMessage}
        />
      ) : null}
      {props.permissions.error ? (
        <ResponseMessage ClassName="Danger" message={props.permissions.error} />
      ) : null}
      <div className="col-12">
        {props.permissions.loading ? (
          <div className="Card card mb-30 bg-white">
            <SmallSpinner />
          </div>
        ) : (
          <div className="Card card mb-30 text-white">
            <div className="card-header">
              <h4>Add Permission</h4>
            </div>
            <div className="card-body">
              <form onSubmit={formSubmit} className="col-12 col-sm-6">
                <label>All Model Names</label>
                <select
                  name="role"
                  onChange={e => setPermission(e.target.value)}
                  className="select d-block"
                  defaultValue="DEFAULT"
                >
                  <option value="DEFAULT" disabled hidden>
                    Choose here
                  </option>
                  {modelNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {permission.length > 0 && (
                  <button type="submit" className="mt-20">
                    Add new Permission
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    permissions: state.permissions
  };
};

const dispatchMapToProps = dispatch => {
  return {
    addPermission: permission => dispatch(actions.addNewPermission(permission)),
    getAllModelNames: () => dispatch(actions.getAllModelNames())
  };
};

export default connect(
  mapStateToProps,
  dispatchMapToProps
)(Permission);
