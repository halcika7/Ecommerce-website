import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

import SmallSpinner from '../../../../users/components/UI/SmallSpinner/SmallSpinner';

import classes from './DataTable.module.css';

const DataTable = props => {

    const [data, setData] = useState([]);
    const [length, setLength] = useState(false);
    const [categoriesLength, setCategoriesLength] = useState(false);
    const [iconsLength, setIconsLength] = useState(false);

    useEffect(() => {
        const data = [];
        for(let user in props.usersData) {
            const object = {
                ...props.usersData[user],
                ...props.usersData[user].emailConfirmation
            }
            data.push(object)
        }
        setLength(data.length)
        setData(data);
    }, [props.usersData]);

    useEffect(() => {
        const data = [];
        for(let category in props.categoriesData) {
            const object = {
                ...props.categoriesData[category]
            }
            data.push(object);
        }
        setCategoriesLength(data.length)
        setData(data);
    }, [props.categoriesData]);

    useEffect(() => {
        const data = [];
        for(let icon in props.iconsData) {
            const object = {
                ...props.iconsData[icon]
            }
            data.push(object);
        }
        setIconsLength(data.length)
        setData(data);
    }, [props.iconsData]);

    const [options] = useState({
        page: 1,  // which page you want to show as default
        sizePerPageList: ((props.userData && props.userData.length < 11) || (props.categoriesData && props.categoriesData.length < 11)) ? [] : [ {
          text: '10', value: 10
        }, {
          text: '15', value: 15
        },
        {
            text: '20', value: 20
        } ], // you can change the dropdown list for size per page
        sizePerPage: 10,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 3,  // the pagination bar size.
        prePage: 'Prev', // Previous page button text
        nextPage: 'Next', // Next page button text
        firstPage: 'First', // First page button text
        lastPage: 'Last', // Last page button text
        paginationShowsTotal: (start, to, total) => {
            return (
              <p>
                From { start } to { to }, totals is { total }
              </p>
            );
          }, 
        paginationPosition: 'bottom', 
        withFirstAndLast: false
    });

    const buttonFormatter = (cell, row) => {
        const id = row._id;
        let view = '/admindashboard/', edit = '/admindashboard/';
        if(props.userData) { view += 'adminViewUser?id='; edit += 'adminEditUser?id=' }
        if(props.categoriesData) { view = 'viewcategory?id='; edit += 'editcategory?id=' }
        if(props.iconsData) { view = 'viewcategoryicon?id='; edit += 'editcategoryicon?id=' }
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

    const imgFormatter = (cell, row) => {
        let src = '', width = '30', height = '30';
        if(props.usersData) { src = `/${row.profilePicture}`; width = '80'; height = '80';}
        if(props.categoriesData || props.iconsData) { src = row.icon ? row.icon : row.name }
        return (
            <React.Fragment>
                <img src={src} alt={row.name} width={width} height={height} />
            </React.Fragment>
        )
    }

    return (
        <div className={classes.DataTable + " card-body"}>
            {props.usersData && 
            <React.Fragment>
                {(!length || length === 0) ? <SmallSpinner /> :
                <BootstrapTable data={data} options={options} bordered={false} pagination version='4' striped hover search={ true } multiColumnSearch={ true }
                containerClass='table-responsive col-12'>
                    <TableHeaderColumn isKey dataField='_id' dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort>User Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' dataSort>User Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='username' dataSort>User Username</TableHeaderColumn>
                    <TableHeaderColumn dataField='confirmed' dataSort>Account Confirmed</TableHeaderColumn>
                    <TableHeaderColumn dataField='profilePicture' dataFormat={imgFormatter.bind(this)}>User Picture</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={buttonFormatter.bind(this)}>Actions</TableHeaderColumn>
                </BootstrapTable>}}
            </React.Fragment>}

            {props.categoriesData && 
            <React.Fragment>
            {props.categoriesData && (!categoriesLength || categoriesLength === 0) ? <SmallSpinner /> :
                <BootstrapTable data={data} options={options} bordered={false} pagination version='4' striped hover search={ true } multiColumnSearch={ true }
                containerClass='table-responsive col-12'>
                    <TableHeaderColumn isKey dataField='_id' dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort>Category Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='icon' dataFormat={imgFormatter}>Category Icon</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={subcategoriesFormatter}>Subcategories</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={buttonFormatter.bind(this)}>Actions</TableHeaderColumn>
                </BootstrapTable>}
            </React.Fragment>}

            {props.iconsData && 
            <React.Fragment>
            {props.iconsData && (!iconsLength || iconsLength === 0) ? <SmallSpinner /> :
                <BootstrapTable data={data} options={options} bordered={false} pagination version='4' striped hover search={ true } multiColumnSearch={ true }
                containerClass='table-responsive col-12'>
                    <TableHeaderColumn isKey dataField='_id' dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort>Icon Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataFormat={imgFormatter}>Category Icon</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={buttonFormatter.bind(this)}>Actions</TableHeaderColumn>
                </BootstrapTable>}
            </React.Fragment>}
        </div>
    );
}

export default DataTable;