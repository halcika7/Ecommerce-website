import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions";
import classnames from "classnames";

import ToggleSwitchButton from "../../components/UI/Buttons/ToggleSwitchButton";
import TagsInput from "../../components/UI/TagsInput/TagsInput";
import ResponseMessages from "../../../users/components/UI/ResponseMessages/ResponseMessages";
import SmallSpinner from "../../../users/components/UI/SmallSpinner/SmallSpinner";

const UpdateRole = props => {
  const [role, setRole] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [choosenPermissions, setChoosenPermissions] = useState({});
  const [allPermissions, setAllPermissions] = useState([]);
  useEffect(() => {
    const id = new URLSearchParams(props.location.search).get("id");
    props.getRole(id);
    props.getPermissions();
  }, []);
  useEffect(() => {
    setRole({ ...props.roleState });
    setRoleName(props.roleState.name);
    setIsAdmin(props.roleState.isAdmin);
    setChoosenPermissions(props.roleState.permissions);
    setAllPermissions(props.allPermissions);
  }, [props.roleState]);

  useEffect(() => {
    setAllPermissions(props.allPermissions);
  }, [props.allPermissions]);
  useEffect(() => {
    if (props.errorId) {
      setTimeout(() => props.history.goBack(), 6000);
    }
  }, [props.errorId]);

  const onFormSubmit = e => {
    e.preventDefault();
    const roleData = {
      id: role._id,
      name: roleName,
      isAdmin,
      permissions: choosenPermissions
    };
    props.updateRole(roleData);
  };

  if (props.failedMessage === true) {
    return <Redirect to="/admindashboard/dashboard" />;
  }

  return (
    <div className="AdminProfile row">
      {props.successMessage ? (
        <ResponseMessages message={props.successMessage} />
      ) : null}
      {props.errorId ? (
        <ResponseMessages ClassName="Danger" message={props.errorId} />
      ) : null}
      <div className="col-12">
        {props.errorId || !roleName ? (
          <div className="card bg-white">
            <SmallSpinner />
          </div>
        ) : (
          <div className="card mb-30 text-white">
            <div className="card-header">
              <h4>Update {props.roleState.name} Role</h4>
            </div>
            <div className="card-body">
              <form onSubmit={onFormSubmit}>
                <div className="mb-20">
                  <label className="d-block">Role Name</label>
                  <input
                    type="text"
                    placeholder="Enter Role Name"
                    value={roleName}
                    onChange={e => setRoleName(e.target.value)}
                    style={{
                      outline: "0px",
                      boxShadow: "none",
                      border: "1px solid rgba(255, 255, 255, 0.489)",
                      marginBottom: "0px"
                    }}
                    className={classnames("w-100 d-block", {
                      invalid: props.failedMessage
                    })}
                    disabled={props.view}
                  />
                  {props.failedMessage && (
                    <div className="invalid-feedback">
                      {props.failedMessage}
                    </div>
                  )}
                </div>
                <div className="mb-20">
                  <ToggleSwitchButton
                    value={isAdmin}
                    setValue={setIsAdmin}
                    name="Is Admin"
                    disabled={props.view}
                  />
                </div>
                <div className="mb-30">
                  <label>Permissions</label>
                  <TagsInput
                    values={allPermissions}
                    choosenValues={choosenPermissions}
                    setChoosenValues={setChoosenPermissions}
                    disabled={props.view}
                  />
                </div>
                {!props.view && <button className="btn">Update Role</button>}
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
    roleState: state.roles.Role,
    successMessage: state.roles.successMessage,
    failedMessage: state.roles.failedMessage,
    allPermissions: state.permissions.allPermissions,
    errorId: state.roles.errorId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRole: id => dispatch(actions.getUserRole(id)),
    getPermissions: () => dispatch(actions.getAllPermissions()),
    updateRole: data => dispatch(actions.updateUserRole(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateRole);
