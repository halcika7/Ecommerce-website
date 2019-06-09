import React, { useState, useEffect } from 'react';
import './Pagination.css';

const hrefLink = '#';

const Pagination = props => {
	const [state, setState] = useState({
		pager: {
			currentPage: 1,
			endIndex: 0,
			endPage: 0,
			pageSize: 0,
			pages: [],
			startIndex: 0,
			startPage: 0,
			totalItems: 0,
			totalPages: 0
		}
	});

	const [showing, setShowing] = useState(1);

	useEffect(() => {
		setPage(props.pageNum);
		if (props.pageNum === 1) {
			setShowing(1);
		} else {
			setShowing(props.showPerPage * (props.pageNum - 1) + 1);
		}
	}, []);

	useEffect(() => {
		setPage(props.pageNum);
		if (props.pageNum === 1) {
			setShowing(1);
		} else {
			setShowing(props.showPerPage * (props.pageNum - 1) + 1);
		}
	}, [props]);

	useEffect(() => {
		props.changePage(state.pager.currentPage);
	}, [state.pager.currentPage]);

	const setPage = page => {
		let pager = state;
		if (page < 1 || page > pager.totalPages) {
			return;
		}
		// get new pager object for specified page
		pager = getPager(props.numberOfProducts, page, props.showPerPage);
		// update state
		setState({ pager: pager });
	};

	const getPager = (totalItems, currentPage, pageSize) => {
		// default to first page
		currentPage = currentPage || 1;
		// default page size is 10
		pageSize = pageSize || 3;
		// calculate total pages
		const totalPages = Math.ceil(totalItems / pageSize);
		let startPage, endPage;
		if (totalPages <= 3) {
			// less than 3 total pages so show all
			startPage = 1;
			endPage = totalPages;
		} else {
			// more than 3 total pages so calculate start and end pages
			if (currentPage <= 2) {
				startPage = 1;
				endPage = 3;
			} else if (currentPage + 1 >= totalPages) {
				startPage = totalPages - 2;
				endPage = totalPages;
			} else {
				startPage = currentPage - 1;
				endPage = currentPage + 1;
			}
		}
		// calculate start and end item indexes
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
		// create an array of pages to ng-repeat in the pager control
		const pages = [...Array(endPage + 1 - startPage).keys()].map(
			i => startPage + i
		);
		// return object with all pager properties required by the view
		return {
			totalItems: totalItems,
			currentPage: currentPage,
			pageSize: pageSize,
			totalPages: totalPages,
			startPage: startPage,
			endPage: endPage,
			startIndex: startIndex,
			endIndex: endIndex,
			pages: pages
		};
	};

	const linkClicked = (e, page) => {
		e.preventDefault();
		setPage(page);
		if (page !== state.pager.currentPage) {
			window.scrollTo({ top: 200, behavior: 'smooth' });
		}
	};

	return (
		<div className="col-12 pagination">
			<span>
				Showing {showing}–
				{props.showPerPage * props.pageNum > props.numberOfProducts
					? props.numberOfProducts
					: props.showPerPage * props.pageNum}{' '}
				of {props.numberOfProducts} results
			</span>
			<nav aria-label="...">
				<ul className="pagination">
					<li
						className={
							state.pager.currentPage === 1 ? 'page-item disabled' : 'page-item'
						}>
						<a
							href={hrefLink}
							onClick={e => linkClicked(e, state.pager.currentPage - 1)}
							className="page-link">
							Previous
						</a>
					</li>
					{state.pager.pages.map((page, index) => (
						<li
							key={index}
							className={
								state.pager.currentPage === page
									? 'page-item active'
									: 'page-item'
							}>
							<a
								href={hrefLink}
								onClick={e => linkClicked(e, page)}
								className="page-link">
								{page}
							</a>
						</li>
					))}
					<li
						className={
							state.pager.currentPage === state.pager.totalPages
								? 'page-item disabled'
								: 'page-item'
						}>
						<a
							href={hrefLink}
							onClick={e => linkClicked(e, state.pager.currentPage + 1)}
							className="page-link">
							Next
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
