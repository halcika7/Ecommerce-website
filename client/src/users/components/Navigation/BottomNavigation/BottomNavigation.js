import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../../../store/actions';
import CategorySearchList from './CategorySearchList/CategorySearchList';
import NavItem from './NavItem/NavItem';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import c from '../Navigation.module.css';

const BottomNavigation = props => {
	const [navItems] = useState([
		{
			name: 'Home',
			link: '/',
			classes: { first: c.navItem, second: c.navLink, third: c.active }
		},
		{
			name: 'Contact',
			link: '/contact',
			classes: { first: c.navItem, second: c.navLink, third: c.active }
		},
		{
			name: 'About',
			link: '/about',
			classes: { first: c.navItem, second: c.navLink, third: c.active }
		},
		{
			name: 'Blog',
			link: '/blog',
			classes: { first: c.navItem, second: c.navLink, third: c.active }
		},
		{
			name: 'Weekly Deals',
			link: '/weeklydeals',
			classes: { first: c.navItem, second: c.navLink, third: c.active }
		},
		{
			name: 'Daily Deals',
			link: '/dailydeals',
			classes: { first: c.navItem, second: c.navLink, third: c.active }
		}
	]);
	const [categories, setCategories] = useState([]);
	const [showCategories, setShowCategories] = useState(false);

	useEffect(() => {
		props.getAllCategories();
		setCategories(props.categories);
	}, []);

	useEffect(() => {
		setCategories(props.categories);
	}, [props.categories]);

	const dropdwonToggler = event => {
		event.currentTarget.parentElement.children[2].classList.toggle(c.active);

		let height = null,
			autoHeight = null;
		let s = event.currentTarget.parentElement.children[2];

		if (s.classList.contains('show')) {
			autoHeight = s.offsetHeight;
			height = s.offsetHeight;
			let animate = setInterval(() => {
				height -= autoHeight / 17;
				s.style.height = height + 'px';
				if (height <= 1) {
					clearInterval(animate);
					s.style = '';
					s.classList.remove('show');
				}
			}, 20);
		} else {
			s.classList = 'navbar-collapse collapse show';
			autoHeight = s.offsetHeight;
			s.style.height = '0px';
			s.classList = 'navbar-collapse collapsing';
			height = 0;
			let animate = setInterval(() => {
				height += autoHeight / 17;
				s.style.height = height + 'px';
				if (height >= autoHeight) {
					clearInterval(animate);
					s.style = '';
				}
			}, 20);

			s.classList = 'navbar-collapse collapse show';
		}
	};

	const categoryDrop = e => {
		const dropdownMenu = e.currentTarget.parentElement.children[1];
		dropdownMenu.classList.toggle(c.active);
	};

	const liOnClick = e => {
		const dropdownLi = document.querySelectorAll('.dropdownLi');
		dropdownLi.forEach(li => {
			if (li.classList.contains(c.active)) {
				li.classList.toggle(c.active);
			}
		});
		e.currentTarget.classList.toggle(c.active);
	};

	const navbar = [c.navbar, c.navbarexpandlg, c.navbarDark, c.bgDark];
	const btn = [c.btn, c.btnPrimary, c.btnMd, c.dropdownToggle];

	return (
		<React.Fragment>
			<nav
				className={
					navbar.join(' ') + ' navbar navbar-expand-lg navbar-dark bg-dark'
				}>
				<div className={c.container + ' container'}>
					<div className={c.dropdown + ' d-none d-lg-block'}>
						<div className={'container'}>
							<button
								style={{ padding: '0' }}
								className={
									btn.join(' ') +
									' btn btn-primary btn-md dropdown-toggle d-none d-lg-block'
								}
								onClick={categoryDrop}
								aria-label="categories">
								All Categories
							</button>
							<div className={c.dropdownMenu + ' dropdown-menu'}>
								<ul>
									{categories.map((category, index) => (
										<li className="dropdownLi" onClick={liOnClick} key={index}>
											<img src={category.icon} alt="" /> {category.name}
											<DropdownMenu
												data={category.subcategories}
												category={category.name}
											/>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
					<button
						className="navbar-toggler"
						aria-label="toggler"
						onClick={dropdwonToggler}>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse">
						<ul className={c.navbarNav + ' navbar-nav'}>
							{navItems.map((item, index) => (
								<NavItem item={item} key={index} />
							))}
							<li className={c.navItem + ' nav-item d-lg-none ' + c.navItemm}>
								<p
									className={
										c.navLink + ' nav-link ' + c.dropdownNavCategoryLinks
									}
									onClick={e => setShowCategories(!showCategories)}>
									Categories
									<i className="fas fa-angle-right" />
								</p>
								<div
									className={c.categoryNavSearchList}
									style={showCategories ? { height: '100%' } : { height: '0' }}>
									<CategorySearchList categories={categories} />
								</div>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		categories: state.category.allCategories
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getAllCategories: () => dispatch(actions.getAllCategories())
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(BottomNavigation)
);
