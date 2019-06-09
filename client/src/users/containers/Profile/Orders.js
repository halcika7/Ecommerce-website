import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUserOrders, getOrder, deleteUserOrder } from '../../../store/actions';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ResponseMessage from '../../components/UI/ResponseMessages/ResponseMessages';

const { SearchBar } = Search;

const Orders = props => {

    useEffect(() => {
        props.getOrders(props.userId);
    }, []);

    const [options] = useState({
		sizePerPage: 10,
		pageStartIndex: 1,
		paginationSize: 3,
		showTotal: true,
		hideSizePerPage: true,
		paginationTotalRenderer: (start, to, total) => (
			<p>
				{' '}
				From {start} to {to}, totals is {total}{' '}
			</p>
		)
    });

    const buttonFormatter = (cell, row) => (
        <React.Fragment>
            <button className="btn btn-warning" type='button' onClick={e => props.showOrder(e, row._id)}>
                <i className="far fa-eye" />
            </button>
            <button
                className="btn btn-danger"
                type="button"
                onClick={e => deleteOrder(e, row._id)}>
                <i className="far fa-trash-alt" />
            </button>
        </React.Fragment>
    );
    
    const columns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'payed',
			text: 'Money Payed $',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'shipped',
			text: 'Shipped',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
        },
        {
			dataField: 'products',
			text: 'Products',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'actions',
			text: 'Actions',
			formatter: buttonFormatter,
			align: 'center',
			headerAlign: 'center',
			csvExport: false
		}
    ];
    
    const rowStyleFormat = (row, rowIndex) => ({ 
        backgroundColor: row.shipped ? 'palegreen' : 'tomato',
        color: row.shipped ? 'black' : 'white' 
    });

    const deleteOrder = (e, id) => {
        e.preventDefault();
        props.deleteOrder(id, props.userId);
    }

    return (
        <React.Fragment>
            <div className="tab-pane fade" id="v-pills-orders" role="tabpanel" aria-labelledby="v-pills-orders-tab">
                {props.orders.failedMessage && <ResponseMessage ClassName='Danger' message={props.orders.failedMessage} />}
                {props.orders.successMessage && <ResponseMessage message={props.orders.successMessage} />}
                <h5>Orders</h5>
                <ToolkitProvider
                    bootstrap4
                    search
                    keyField="_id"
                    data={props.orders.userOrders}
                    columns={columns}>
                    {props => (
                        <React.Fragment>
                            <div className="row mb-20 Spans">
                                <div className="col-sm-6">
                                    <SearchBar {...props.searchProps} tableId="1" />
                                </div>
                            </div>
                            <BootstrapTable
                                noDataIndication={() => <div>No data available</div>}
                                wrapperClasses='table-responsive'
                                {...props.baseProps}
                                rowStyle={rowStyleFormat}
                                striped
                                hover
                                condensed
                                bordered={false}
                                filter={filterFactory()}
                                pagination={paginationFactory(options)}
                            />
                        </React.Fragment>
                    )}
                </ToolkitProvider>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    orders: state.orders
});

const mapDispatchToProps = dispatch => ({
    getOrders: (id) => dispatch(getAllUserOrders(id)),
    getOrder: id => dispatch(getOrder(id)),
    deleteOrder: (id, userId) => dispatch(deleteUserOrder(id, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);