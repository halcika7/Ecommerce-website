import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import faker from 'faker';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

import classes from './AdminProductsPage.module.css';

const AdminProductsPage = props => {
    const [data, setData] = useState({});
    const [options] = useState({
        page: 1,  // which page you want to show as default
        sizePerPageList: [ {
          text: '10', value: 10
        }, {
          text: '15', value: 15
        },
        {
            text: '20', value: 20
        }, 
        {
          text: 'All', value: data.length
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
          },  // Accept bool or function
        paginationPosition: 'bottom',  // default is bottom, top and both is all available
        // hideSizePerPage: true > You can hide the dropdown for sizePerPage
        // alwaysShowAllBtns: true // Always show next and previous button
        withFirstAndLast: false //> Hide the going to First and Last page button
      })
    useEffect(() => {
        const data = [];
        for (var i=0; i<1000; i++) {
            data.push({
              _id: i,
              fullName: faker.name.findName(),
              'email.address': faker.internet.email(),
              phone_number: faker.phone.phoneNumber(),
              actions: {
                  delete: {
                      type: 'button',
                      name: 'delete'
                  }
              }
            })
          }
          setData({ data });
    }, []);

    const onClickProductSelected = (row) => {
        console.log('Product #', row);
    }

    const buttonFormatter = (cell, row) => {
        return (
            <React.Fragment>
                <Link className="btn btn-warning" to='/admindashboard/dashboard'>
                    <i className="far fa-eye"></i>
                </Link>
                <button className="btn btn-danger" type="button" 
                    onClick={() => 
                    onClickProductSelected(row)}>
                       <i className="far fa-trash-alt"></i>
                </button>
            </React.Fragment>
        )
    }
    
    return (
        <div className={classes.AdminProductsPage + " row"}>
            <div className={'col-12 text-white'}>
                <div className="card mb-30">
                    <div className="card-body">
                        <BootstrapTable data={data.data} options={options} bordered={false} pagination version='4' striped hover search={ true } multiColumnSearch={ true }
                        containerClass='table-responsive col-12'>
                            <TableHeaderColumn isKey dataField='_id' width='90' dataSort>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='fullName' dataSort>Product Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='email.address' dataSort>Product Price</TableHeaderColumn>
                            <TableHeaderColumn dataField='phone_number' dataSort>Product Price</TableHeaderColumn>
                            <TableHeaderColumn dataField='button' dataFormat={buttonFormatter.bind(this)}>Actions</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProductsPage;