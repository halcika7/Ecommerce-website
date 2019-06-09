import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './DataTable.css';

const { SearchBar, ClearSearchButton } = Search;
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
	useEffect(() => {
		if (props.couponsData) {
			setFunction(props.couponsData, setLength);
		}
	}, [props.couponsData]);
	useEffect(() => {
		if (props.answersData) {
			setFunction(props.answersData, setLength);
		}
	}, [props.answersData]);
	useEffect(() => {
		if (props.termsData) {
			setFunction(props.termsData, setLength);
		}
	}, [props.termsData]);
	useEffect(() => {
		if (props.storesData) {
			setFunction(props.storesData, setLength);
		}
	}, [props.storesData]);
	useEffect(() => {
		if (props.productsData) {
			setFunction(props.productsData, setLength);
		}
	}, [props.productsData]);
	useEffect(() => {
		if (props.ordersData) {
			setFunction(props.ordersData, setLength);
		}
	}, [props.ordersData]);

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

	const selectAllDataCheckbox = (isSelect, rows, e) => {
		if (typeof isSelect === 'boolean' && rows) {
			const tableRows = document.querySelectorAll('tbody input'),
				choosenValues = [];
			rows.forEach((row, index) => {
				if (isSelect === false) {
					return (tableRows[index].checked = false);
				}
				if (isSelect === true) {
					tableRows[index].checked = true;
					(!props.permissionsData && !props.couponsData)
						? choosenValues.push(row._id)
						: choosenValues.push(row.permission);
					return;
				}
			});
			props.setDeleteData(choosenValues);
		}
	};

	const selectOneDataCheckbox = (row, isSelect, rowIndex, e) => {
		if (e && !e.target.closest('tbody td:last-child')) {
			const newDeleteMany = [...props.selectedDeleteData],
				input = document.querySelectorAll("tbody input[type='checkbox']"),
				index = (!props.permissionsData && !props.couponsData)
					? newDeleteMany.findIndex(name => name === row._id)
					: newDeleteMany.findIndex(
							permission => permission === row.permission
					  );
			if (e.target.type !== 'checkbox') {
				input[rowIndex].checked = isSelect ? true : false;
			}
			if (index === -1) {
				(!props.permissionsData && !props.couponsData)
					? newDeleteMany.push(row._id)
					: newDeleteMany.push(row.permission);
			} else {
				newDeleteMany.splice(index, 1);
			}
			props.setDeleteData(newDeleteMany);
		}
	};

	const buttonFormatter = (cell, row) => {
		let id = row._id,
			name = row.name,
			view = '/admindashboard/',
			edit = '/admindashboard/';
		if (props.usersData) {
			view += 'view-user?id=';
			edit += 'edit-user?id=';
		}
		if (props.categoriesData) {
			view = 'view-category?id=';
			edit += 'edit-category?id=';
		}
		if (props.iconsData) {
			view = 'view-category-icon?id=';
			edit += 'edit-category-icon?id=';
		}
		if (props.brandsData) {
			view = 'view-brand?id=';
			edit += 'edit-brand?id=';
		}
		if (props.rolesData) {
			view = 'view-role?id=';
			edit += 'edit-role?id=';
		}
		if (props.permissionsData) {
			id = row.permission;
		}
		if (props.answersData) {
			view = 'view-answer?id=';
			edit += 'edit-answer?id=';
		}
		if (props.termsData) {
			view = 'view-term?id=';
			edit += 'edit-term?id=';
		}
		if (props.storesData) {
			view = 'view-store?id=';
			edit += 'edit-store?id=';
		}
		if (props.productsData) {
			view = 'view-product?id=';
			edit += 'edit-product?id=';
		}
		if (props.ordersData) {
			view = 'view-order?id=';
			edit += 'edit-order?id=';
		}
		return (
			<React.Fragment>
				{(!props.permissionsData && !props.couponsData) && (
					<Link className="btn btn-warning" to={`${view}${id}`}>
						<i className="far fa-eye" />
					</Link>
				)}
				{(!props.permissionsData && !props.couponsData) && (
					<Link className="btn btn-primary" to={`${edit}${id}`}>
						<i className="far fa-edit" />
					</Link>
				)}
				<button
					className="btn btn-danger"
					type="button"
					onClick={e => props.click(e, id, name)}>
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
	const subcategoriesFormatter = (cell, row, ...rest) =>
		row.subcategories.length > 0 ? (
			<div>
				{row.subcategories.map((sub, index) => (
					<span key={index} className="SPAN">
						{sub.name}
					</span>
				))}
			</div>
		) : (
			'No Subcategories'
		);
	const categoriesFormatter = (cell, row) =>
		row.categories.length > 0 ? (
			<div>
				{row.categories.map((cat, index) => (
					<span key={index} className="SPAN">
						{cat}
					</span>
				))}
			</div>
		) : (
			'No categories'
		);
	const confirmFormatter = (cell, row) => {
		const customClass = row.emailConfirmation ? 'Confirmed' : 'NotConfirmed';
		return (
			<span className={customClass}>{row.emailConfirmation.toString()}</span>
		);
	};
	const featuredFormatter = (cell, row) => {
		const customClass = row.featured ? 'Confirmed' : 'NotConfirmed';
		return (
			<span className={customClass}>{row.featured.toString()}</span>
		);
	};
	const publishedFormatter = (cell, row) => {
		const customClass = row.published ? 'Confirmed' : 'NotConfirmed';
		return (
			<span className={customClass}>{row.published.toString()}</span>
		);
	};
	const imgFormatter = (cell, row) => {
		let src = '',
			width = '30',
			height = '30';
		if (props.usersData) {
			src = `/${row.profilePicture}`;
			width = '50';
			height = '50';
		}
		if (props.storesData) {
			src = `/${row.picture}`;
			width = '50';
			height = '50';
		}
		if (props.productsData) {
			src = `/${row.featuredPicture}`;
			width = '50';
			height = '50';
		}
		if (props.categoriesData || props.iconsData) {
			src = row.icon ? row.icon : row.name;
		}
		return <img src={src} alt={row.name} width={width} height={height} />;
	};
	const dateFormatter = (cell, row) => {
		const date = new Date();
		const expires = new Date(row.exparationDate);
		const difference = Math.floor((Date.UTC(expires.getFullYear(), expires.getMonth(), expires.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) ) /(1000 * 60 * 60 * 24));
		console.log(difference)
		return difference > 0 ? <span>Expires in {difference} {difference > 1 ? "day's" : 'day' }</span> : <span>Coupon expired</span>;
	};

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

	const containerClass = props.usersData
		? 'table-responsive UsersTable'
		: props.productsData ? 'table-responsive Spans Products' : 'table-responsive Spans';
	const selectRow = !props.usersData
		? {
				mode: 'checkbox',
				onSelect: selectOneDataCheckbox,
				onSelectAll: selectAllDataCheckbox,
				clickToSelect: true,
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
				bgColor: '#9E1429'
		  }
		: {};

	const roleColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'name',
			text: 'Name',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'permissions',
			formatter: roleSubcategoriesFormatter,
			text: 'Permissions',
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

	const userColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'name',
			text: 'Name',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'email',
			text: 'Email',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'username',
			text: 'Username',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'emailConfirmation',
			text: 'Account Confirmed',
			formatter: confirmFormatter,
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'profilePicture',
			formatter: imgFormatter,
			text: 'User Picture',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true,
			csvExport: false
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

	const categoryColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'name',
			text: 'Name',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'subcategories',
			text: 'Subcategories',
			formatter: subcategoriesFormatter,
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'icon',
			formatter: imgFormatter,
			text: 'Category Icon',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true,
			csvExport: false
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

	const iconColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'name',
			text: 'Name',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'icon',
			formatter: imgFormatter,
			text: 'Icon IMG',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true,
			csvExport: false
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

	const brandColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'name',
			text: 'Name',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'categories',
			formatter: categoriesFormatter,
			text: 'Categories',
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

	const permissionColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'permission',
			text: 'Permission',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'slug',
			text: 'Slug',
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

	const couponColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'name',
			text: 'Name',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'type',
			text: 'Type',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'value',
			text: 'Value',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'exparationDate',
			formatter: dateFormatter,
			text: 'Exparation Date',
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

	const answersColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'question',
			text: 'Question',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'answer',
			text: 'Answer',
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

	const termsColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'term',
			text: 'Term',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'text',
			text: 'Text',
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

	const storesColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'address',
			text: 'Address',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'city',
			text: 'City',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'country',
			text: 'Country',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'email',
			text: 'Email',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'phone',
			text: 'Phone',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'picture',
			formatter: imgFormatter,
			text: 'Store Picture',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true,
			csvExport: false
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

	const productsColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'name',
			text: 'Name',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'prodRating',
			text: 'Product Rating',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'price',
			text: 'Price',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'category',
			text: 'Category',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'brand',
			text: 'Brand',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'year',
			text: 'Year',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'numberOfsales',
			text: 'Number of sales',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'numberOfOptions',
			text: 'Number of options',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'published',
			text: 'Published',
			formatter: publishedFormatter,
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'featured',
			text: 'Featured',
			formatter: featuredFormatter,
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'featuredPicture',
			formatter: imgFormatter,
			text: 'Product picture',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true,
			csvExport: false
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

	const ordersColumns = [
		{
			dataField: '_id',
			text: 'ID',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'userId',
			text: 'User Id',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'address',
			text: 'Address',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'city',
			text: 'City',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'country',
			text: 'Country',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'email',
			text: 'Email',
			filter: textFilter(),
			align: 'center',
			headerAlign: 'center',
			sort: true
		},
		{
			dataField: 'payed',
			text: 'Money paid $',
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

	return (
		<div className="DataTable card-body col-12">
			<React.Fragment>
				{length === false || props.loading || !props.rolesData ? null : (
					<ToolkitProvider
						bootstrap4
						search
						keyField="_id"
						data={data}
						columns={roleColumns}
						exportCSV
						selectedData={props.selectedDeleteData}>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No data available</div>}
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

				{length === false || props.loading || !props.categoriesData ? null : (
					<ToolkitProvider
						bootstrap4
						search
						keyField="_id"
						data={data}
						columns={categoryColumns}
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No data available</div>}
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
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No data available</div>}
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

				{length === false || props.loading || !props.couponsData ? null : (
					<ToolkitProvider
						bootstrap4
						search
						keyField="_id"
						data={data}
						columns={couponColumns}
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No Registers available</div>}
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
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No data available</div>}
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
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No data available</div>}
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

				{length === false || props.loading || !props.permissionsData ? null : (
					<ToolkitProvider
						bootstrap4
						search
						keyField="_id"
						data={data}
						columns={permissionColumns}
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No Registers available</div>}
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

				{length === false || props.loading || !props.answersData ? null : (
					<ToolkitProvider
						bootstrap4
						search
						keyField="_id"
						data={data}
						columns={answersColumns}
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No Registers available</div>}
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

				{length === false || props.loading || !props.termsData ? null : (
					<ToolkitProvider
						bootstrap4
						search
						keyField="_id"
						data={data}
						columns={termsColumns}
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No Registers available</div>}
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

				{length === false || props.loading || !props.storesData ? null : (
					<ToolkitProvider
						bootstrap4
						search
						keyField="_id"
						data={data}
						columns={storesColumns}
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No Registers available</div>}
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

				{length === false || props.loading || !props.productsData ? null : (
					<ToolkitProvider
						bootstrap4
						search
						keyField="_id"
						data={data}
						columns={productsColumns}
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No Registers available</div>}
									wrapperClasses={containerClass}
									style={{ minWidth: '2500px' }}
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

				{length === false || props.loading || !props.ordersData ? null : (
					<ToolkitProvider
						bootstrap4
						search
						keyField="_id"
						data={data}
						columns={ordersColumns}
						exportCSV>
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
										<ClearSearchButton
											{...props.searchProps}
											className="btn-sm"
										/>
									</div>
								</div>
								<BootstrapTable
									noDataIndication={() => <div>No Registers available</div>}
									wrapperClasses={containerClass}
									style={{ minWidth: '2500px' }}
									rowStyle={rowStyleFormat}
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
			</React.Fragment>
		</div>
	);
};

export default DataTable;
