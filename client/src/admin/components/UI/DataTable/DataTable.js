import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport
} from "react-bootstrap-table2-toolkit";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./DataTable.css";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const DataTable = props => {
  const [data, setData] = useState([]);
  const [length, setLength] = useState(false);
  useEffect(() => {
    if (props.usersData) {
      setFunction(props.usersData, setLength);
    }
  }, [props.usersData]);
  useEffect(() => {
    if (props.categoriesData) {
      setFunction(props.categoriesData, setLength);
    }
  }, [props.categoriesData]);
  useEffect(() => {
    if (props.iconsData) {
      setFunction(props.iconsData, setLength);
    }
  }, [props.iconsData]);
  useEffect(() => {
    if (props.brandsData) {
      setFunction(props.brandsData, setLength);
    }
  }, [props.brandsData]);
  useEffect(() => {
    if (props.rolesData) {
      setFunction(props.rolesData, setLength);
    }
  }, [props.rolesData]);
  useEffect(() => {
    if (props.permissionsData) {
      setFunction(props.permissionsData, setLength);
    }
  }, [props.permissionsData]);

  const setFunction = (Data, setDataLength) => {
    let data = [];
    for (let obj in Data) {
      let object = { ...Data[obj] };
      if (props.usersData) {
        object = {
          ...Data[obj],
          emailConfirmation: Data[obj].emailConfirmation.confirmed
        };
      }
      data.push(object);
    }
    setDataLength(data.length);
    setData(data);
  };

  const selectAllDataCheckbox = e => {
    if (e === true || e === false) {
      const tableRows = document.querySelectorAll("tbody input"),
        tableRowTdThirdChild = document.querySelectorAll(
          "tbody tr td:nth-child(2)"
        ),
        choosenValues = [];
      tableRows.forEach((row, index) => {
        if (e === false) {
          return (row.checked = false);
        }
        if (e === true) {
          row.checked = true;
          choosenValues.push(tableRowTdThirdChild[index].innerHTML);
          return;
        }
      });
      props.setDeleteData(choosenValues);
    }
  };

  const selectOneDataCheckbox = val => {
    if (val._id) {
      const newDeleteMany = [...props.selectedDeleteData],
        index = newDeleteMany.findIndex(name => name === val._id),
        tableRows = document.querySelectorAll("tbody tr");
      tableRows.forEach(row => {
        if (val._id === row.children[1].innerHTML) {
          if (row.children[0].children[0].children[0].checked) {
            row.children[0].children[0].children[0].checked = false;
          } else {
            row.children[0].children[0].children[0].checked = true;
          }
        }
      });
      if (index === -1) {
        newDeleteMany.push(val._id);
      } else {
        newDeleteMany.splice(index, 1);
      }
      props.setDeleteData(newDeleteMany);
    }
  };

  const buttonFormatter = (cell, row) => {
    let id = row._id,
      view = "/admindashboard/",
      edit = "/admindashboard/";
    if (props.usersData) {
      view += "view-user?id=";
      edit += "edit-user?id=";
    }
    if (props.categoriesData) {
      view = "view-category?id=";
      edit += "edit-category?id=";
    }
    if (props.iconsData) {
      view = "view-category-icon?id=";
      edit += "edit-category-icon?id=";
    }
    if (props.brandsData) {
      view = "view-brand?id=";
      edit += "edit-brand?id=";
    }
    if (props.rolesData) {
      view = "view-role?id=";
      edit += "edit-role?id=";
    }
    if (props.permissionsData) {
      id = row.permission;
      view = "view-role?id=";
      edit += "edit-role?id=";
    }
    return (
      <React.Fragment>
        <Link className="btn btn-warning" to={`${view}${id}`}>
          <i className="far fa-eye" />
        </Link>
        <Link className="btn btn-primary" to={`${edit}${id}`}>
          <i className="far fa-edit" />
        </Link>
        <button
          className="btn btn-danger"
          type="button"
          onClick={e => props.click(e, id)}
        >
          <i className="far fa-trash-alt" />
        </button>
      </React.Fragment>
    );
  };

  const roleSubcategoriesFormatter = (cell, row) =>
    row.permissions.length > 0 ? (
      <div>
        {row.permissions.map((permission, index) => (
          <span key={index} className="SPAN">
            {permission}
          </span>
        ))}
      </div>
    ) : (
      <div>No Permissions</div>
    );
  const subcategoriesFormatter = (cell, row) =>
    row.subcategories.length > 0
      ? row.subcategories.map((sub, index) => (
          <span key={index} class="SPAN">
            {sub.name}
          </span>
        ))
      : "No Subcategories";
  const categoriesFormatter = (cell, row) =>
    row.categories.length
      ? row.categories.map((cat, index) => (
          <span key={index} class="SPAN">
            {cat}
          </span>
        ))
      : "No categories";
  const confirmFormatter = (cell, row) => {
    const customClass = row.emailConfirmation ? "Confirmed" : "NotConfirmed";
    return (
      <span className={customClass}>{row.emailConfirmation.toString()}</span>
    );
  };
  const imgFormatter = (cell, row) => {
    let src = "",
      width = "30",
      height = "30";
    if (props.usersData) {
      src = `/${row.profilePicture}`;
      width = "80";
      height = "80";
    }
    if (props.categoriesData || props.iconsData) {
      src = row.icon ? row.icon : row.name;
    }
    return <img src={src} alt={row.name} width={width} height={height} />;
  };

  const [options] = useState({
    sizePerPage: 10,
    pageStartIndex: 1,
    paginationSize: 3,
    showTotal: true,
    hideSizePerPage: true,
    paginationTotalRenderer: (start, to, total) => (
      <p>
        {" "}
        From {start} to {to}, totals is {total}{" "}
      </p>
    )
  });

  const containerClass = !props.usersData
    ? "table-responsive Spans"
    : "table-responsive UsersTable";
  const selectRow = !props.usersData
    ? {
        mode: "checkbox",
        clickToSelect: true,
        onSelect: selectOneDataCheckbox,
        onSelectAll: selectAllDataCheckbox,
        selectionHeaderRenderer: ({ indeterminate, ...rest }) => (
          <div className="checkbox">
            <input
              {...rest}
              onChange={selectAllDataCheckbox}
              type="checkbox"
              ref={input => {
                if (input) input.indeterminate = indeterminate;
              }}
            />
            <label />
          </div>
        ),
        selectionRenderer: ({ mode, ...rest }) => (
          <div className="checkbox">
            <input type={mode} onChange={selectOneDataCheckbox} />
            <label />
          </div>
        ),
        bgColor: "#F08080"
      }
    : {};

  const roleColumns = [
    {
      dataField: "_id",
      text: "ID",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "name",
      text: "Name",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "permissions",
      formatter: roleSubcategoriesFormatter,
      text: "Permissions",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: buttonFormatter,
      align: "center",
      headerAlign: "center",
      csvExport: false
    }
  ];

  const userColumns = [
    {
      dataField: "_id",
      text: "ID",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "name",
      text: "Name",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "email",
      text: "Email",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "username",
      text: "Username",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "emailConfirmation",
      text: "Account Confirmed",
      formatter: confirmFormatter,
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "profilePicture",
      formatter: imgFormatter,
      text: "User Picture",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true,
      csvExport: false
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: buttonFormatter,
      align: "center",
      headerAlign: "center",
      csvExport: false
    }
  ];

  const categoryColumns = [
    {
      dataField: "_id",
      text: "ID",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "name",
      text: "Name",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "subcategories",
      text: "Subcategories",
      formatter: subcategoriesFormatter,
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "icon",
      formatter: imgFormatter,
      text: "Category Icon",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true,
      csvExport: false
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: buttonFormatter,
      align: "center",
      headerAlign: "center",
      csvExport: false
    }
  ];

  const iconColumns = [
    {
      dataField: "_id",
      text: "ID",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "name",
      text: "Name",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "icon",
      formatter: imgFormatter,
      text: "Icon IMG",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true,
      csvExport: false
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: buttonFormatter,
      align: "center",
      headerAlign: "center",
      csvExport: false
    }
  ];

  const brandColumns = [
    {
      dataField: "_id",
      text: "ID",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "name",
      text: "Name",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "categories",
      formatter: categoriesFormatter,
      text: "Categories",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: buttonFormatter,
      align: "center",
      headerAlign: "center",
      csvExport: false
    }
  ];

  const permissionColumns = [
    {
      dataField: "_id",
      text: "ID",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "permission",
      text: "Permission",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "slug",
      text: "Slug",
      filter: textFilter(),
      align: "center",
      headerAlign: "center",
      sort: true
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: buttonFormatter,
      align: "center",
      headerAlign: "center",
      csvExport: false
    }
  ];

  return (
    <div className="DataTable card-body col-12">
      <React.Fragment>
        {length === 0 ? (
          <h4>No Data</h4>
        ) : (
          <React.Fragment>
            {length === false || props.loading || !props.rolesData ? null : (
              <ToolkitProvider
                bootstrap4
                search
                keyField="_id"
                data={data}
                columns={roleColumns}
                exportCSV
                selectedData={props.selectedDeleteData}
              >
                {props => (
                  <React.Fragment>
                    <div className="row mb-20 Spans">
                      <div className="col-sm-6">
                        <ExportCSVButton {...props.csvProps}>
                          Export CSV
                        </ExportCSVButton>
                      </div>
                      <div className="col-sm-6">
                        <SearchBar {...props.searchProps} tableId="1" />
                      </div>
                    </div>
                    <BootstrapTable
                      wrapperClasses={containerClass}
                      headerClasses="headerClass"
                      {...props.baseProps}
                      striped
                      hover
                      bordered={false}
                      filter={filterFactory()}
                      selectRow={selectRow}
                      pagination={paginationFactory(options)}
                    />
                  </React.Fragment>
                )}
              </ToolkitProvider>
            )}

            {length === false ||
            props.loading ||
            !props.categoriesData ? null : (
              <ToolkitProvider
                bootstrap4
                search
                keyField="_id"
                data={data}
                columns={categoryColumns}
                exportCSV
                selectedData={props.selectedDeleteData}
              >
                {props => (
                  <React.Fragment>
                    <div className="row mb-20 Spans">
                      <div className="col-sm-6">
                        <ExportCSVButton {...props.csvProps}>
                          Export CSV
                        </ExportCSVButton>
                      </div>
                      <div className="col-sm-6">
                        <SearchBar {...props.searchProps} tableId="1" />
                      </div>
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      wrapperClasses={containerClass}
                      striped
                      hover
                      bordered={false}
                      filter={filterFactory()}
                      selectRow={selectRow}
                      pagination={paginationFactory(options)}
                    />
                  </React.Fragment>
                )}
              </ToolkitProvider>
            )}

            {length === false || props.loading || !props.usersData ? null : (
              <ToolkitProvider
                bootstrap4
                search
                keyField="_id"
                data={data}
                columns={userColumns}
                exportCSV
                selectedData={props.selectedDeleteData}
              >
                {props => (
                  <React.Fragment>
                    <div className="row mb-20">
                      <div className="col-sm-6">
                        <ExportCSVButton {...props.csvProps}>
                          Export CSV
                        </ExportCSVButton>
                      </div>
                      <div className="col-sm-6">
                        <SearchBar {...props.searchProps} tableId="1" />
                      </div>
                    </div>
                    <BootstrapTable
                      wrapperClasses={containerClass}
                      {...props.baseProps}
                      striped
                      hover
                      bordered={false}
                      filter={filterFactory()}
                      pagination={paginationFactory(options)}
                    />
                  </React.Fragment>
                )}
              </ToolkitProvider>
            )}

            {length === false || props.loading || !props.iconsData ? null : (
              <ToolkitProvider
                bootstrap4
                search
                keyField="_id"
                data={data}
                columns={iconColumns}
                exportCSV
                selectedData={props.selectedDeleteData}
              >
                {props => (
                  <React.Fragment>
                    <div className="row mb-20 Spans">
                      <div className="col-sm-6">
                        <ExportCSVButton {...props.csvProps}>
                          Export CSV
                        </ExportCSVButton>
                      </div>
                      <div className="col-sm-6">
                        <SearchBar {...props.searchProps} tableId="1" />
                      </div>
                    </div>
                    <BootstrapTable
                      wrapperClasses={containerClass}
                      {...props.baseProps}
                      striped
                      hover
                      bordered={false}
                      filter={filterFactory()}
                      selectRow={selectRow}
                      pagination={paginationFactory(options)}
                    />
                  </React.Fragment>
                )}
              </ToolkitProvider>
            )}

            {length === false || props.loading || !props.brandsData ? null : (
              <ToolkitProvider
                bootstrap4
                search
                keyField="_id"
                data={data}
                columns={brandColumns}
                exportCSV
                selectedData={props.selectedDeleteData}
              >
                {props => (
                  <React.Fragment>
                    <div className="row mb-20 Spans">
                      <div className="col-sm-6">
                        <ExportCSVButton {...props.csvProps}>
                          Export CSV
                        </ExportCSVButton>
                      </div>
                      <div className="col-sm-6">
                        <SearchBar {...props.searchProps} tableId="1" />
                      </div>
                    </div>
                    <BootstrapTable
                      wrapperClasses={containerClass}
                      {...props.baseProps}
                      striped
                      hover
                      bordered={false}
                      filter={filterFactory()}
                      selectRow={selectRow}
                      pagination={paginationFactory(options)}
                    />
                  </React.Fragment>
                )}
              </ToolkitProvider>
            )}

            {length === false ||
            props.loading ||
            !props.permissionsData ? null : (
              <ToolkitProvider
                bootstrap4
                search
                keyField="_id"
                data={data}
                columns={permissionColumns}
                exportCSV
                selectedData={props.selectedDeleteData}
              >
                {props => (
                  <React.Fragment>
                    <div className="row mb-20 Spans">
                      <div className="col-sm-6">
                        <ExportCSVButton {...props.csvProps}>
                          Export CSV
                        </ExportCSVButton>
                      </div>
                      <div className="col-sm-6">
                        <SearchBar {...props.searchProps} tableId="1" />
                      </div>
                    </div>
                    <BootstrapTable
                      wrapperClasses={containerClass}
                      {...props.baseProps}
                      striped
                      hover
                      bordered={false}
                      filter={filterFactory()}
                      selectRow={selectRow}
                      pagination={paginationFactory(options)}
                    />
                  </React.Fragment>
                )}
              </ToolkitProvider>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
};

export default DataTable;
