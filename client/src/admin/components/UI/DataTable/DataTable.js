import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import classes from './DataTable.module.css';

const DataTable = props => {
    const [data, setData] = useState([]);
    const [length, setLength] = useState(false);
    const [selectedAll, setSelectedAll] = useState(false);

    useEffect(() => { setFunction(props.usersData, setLength); }, [props.usersData]);
    useEffect(() => { setFunction(props.categoriesData, setLength); }, [props.categoriesData]);
    useEffect(() => { setFunction(props.iconsData, setLength); }, [props.iconsData]);
    useEffect(() => { setFunction(props.brandsData, setLength); }, [props.brandsData]);

    const setFunction = (Data, setDataLength) => {
        const data = [];
        for(let obj in Data) {
            let object = { ...Data[obj] };
            if(props.usersData) { object = { ...Data[obj], emailConfirmation: Data[obj].emailConfirmation.confirmed }; }
            data.push(object);
        }
        setDataLength(data.length);
        setData(data);
    }

    const selectAllDataCheckbox = () => {
        const tableRows = document.querySelectorAll('tbody input');
        const tableRowTdThirdChild = document.querySelectorAll('tbody tr td:nth-child(2)');
        const choosenValues = []
        tableRows.forEach((row, index) => {
            if(selectedAll){ return row.checked = false; }
            row.checked = true;
            choosenValues.push(tableRowTdThirdChild[index].innerHTML);
        });
        if(selectedAll) { setSelectedAll(false); }
        else { setSelectedAll(true); }
        props.setDeleteData(choosenValues);
    }

    const selectOneDataCheckbox = ({...val}) => {
        const newDeleteMany = [...props.selectedDeleteData];
        const index = newDeleteMany.findIndex(name => name === val._id);
        if(index === -1) { newDeleteMany.push(val._id);}
        else { newDeleteMany.splice(index, 1); }
        props.setDeleteData(newDeleteMany);
        setSelectedAll(true);
    }

    const buttonFormatter = (cell, row) => {
        const id = row._id;
        let view = '/admindashboard/', edit = '/admindashboard/';
        if(props.usersData) { view += 'adminViewUser?id='; edit += 'adminEditUser?id=' }
        if(props.categoriesData) { view = 'viewcategory?id='; edit += 'editcategory?id=' }
        if(props.iconsData) { view = 'viewcategoryicon?id='; edit += 'editcategoryicon?id=' }
        if(props.brandsData) { view = 'viewbrand?id='; edit += 'editbrand?id=' }
        return (
            <React.Fragment>
                <Link className="btn btn-warning" to={`${view}${id}`}>
                    <i className="far fa-eye"></i>
                </Link>
                <Link className="btn btn-primary" to={`${edit}${id}`}>
                    <i className="far fa-edit"></i>
                </Link>
                <button className="btn btn-danger" type="button" 
                    onClick={(e) => props.click(e,id)}>
                        <i className="far fa-trash-alt"></i>
                </button>
            </React.Fragment>
        )
    }

    const subcategoriesFormatter = (cell, row) => row.subcategories.map((sub, index) => `<span class=${classes.SPAN}>${sub.name}</span>`).join('');
    const categoriesFormatter = (cell, row) => row.categories.map((cat, index) => `<span class=${classes.SPAN}>${cat}</span>`).join('');

    const imgFormatter = (cell, row) => {
        let src = '', width = '30', height = '30';
        if(props.usersData) { src = `/${row.profilePicture}`; width = '80'; height = '80';}
        if(props.categoriesData || props.iconsData) { src = row.icon ? row.icon : row.name }
        return ( <img src={src} alt={row.name} width={width} height={height} /> );
    }

    const [options] = useState({
        page: 1,  // which page you want to show as default
        sizePerPageList: [],
        sizePerPage: 10,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 3,  // the pagination bar size.
        prePage: 'Prev', // Previous page button text
        nextPage: 'Next', // Next page button text
        firstPage: 'First', // First page button text
        lastPage: 'Last', // Last page button text
        paginationShowsTotal: (start, to, total) => <p> From { start } to { to }, totals is { total } </p>,
        paginationPosition: 'bottom', 
        withFirstAndLast: false
    });

    return (
        <div className={classes.DataTable + " card-body"}>
            <React.Fragment>
                {(length === false || props.loading || props.usersData) ? null :
                <BootstrapTable data={data} options={options} bordered={false} pagination version='4' striped hover search={ true } multiColumnSearch={ true }
                containerClass='table-responsive col-12' exportCSV selectRow={!props.usersData ? {mode: 'checkbox', onSelectAll: selectAllDataCheckbox, onSelect: selectOneDataCheckbox, bgColor: '#F08080'} : {}} >
                    <TableHeaderColumn isKey dataField='_id' dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort>Name</TableHeaderColumn>
                    {(props.categoriesData || props.iconsData )&& <TableHeaderColumn dataField='icon' dataFormat={imgFormatter}>Category Icon</TableHeaderColumn>}
                    {(props.categoriesData && length > 0) && <TableHeaderColumn dataFormat={subcategoriesFormatter}>Subcategories</TableHeaderColumn>}
                    {(props.brandsData && length > 0) && <TableHeaderColumn className={classes.Categories} dataField='categories' dataFormat={categoriesFormatter}>Categories</TableHeaderColumn>}
                    <TableHeaderColumn dataField='actions' dataFormat={buttonFormatter.bind(this)} export={false}>Actions</TableHeaderColumn>
                </BootstrapTable>}

                {(length === false || !props.usersData || props.loading) ? null :
                <BootstrapTable data={data} options={options} bordered={false} pagination version='4' striped hover search={ true } multiColumnSearch={ true }
                containerClass='table-responsive col-12' exportCSV selectRow={!props.usersData ? {mode: 'checkbox', onSelectAll: selectAllDataCheckbox, onSelect: selectOneDataCheckbox, bgColor: '#F08080'} : {}} >
                    <TableHeaderColumn isKey dataField='_id' dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' dataSort>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='username' dataSort>Username</TableHeaderColumn>
                    <TableHeaderColumn dataField='emailConfirmation' dataSort>Account Confirmed</TableHeaderColumn>
                    <TableHeaderColumn dataField='profilePicture' dataFormat={imgFormatter.bind(this)} export={false}>User Picture</TableHeaderColumn>
                    <TableHeaderColumn dataField='actions' dataFormat={buttonFormatter.bind(this)} export={false}>Actions</TableHeaderColumn>
                </BootstrapTable>}
            </React.Fragment>
        </div>
    );
}

export default DataTable;
