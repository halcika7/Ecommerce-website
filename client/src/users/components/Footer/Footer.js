import React from 'react';
import { Link } from 'react-router-dom';

import FooterList from './FooterList/FooterList';
import FooterSocialIcons from '../UI/FooterSocialIcons/FooterSocialIcons';
import MobileApps from './MobileApps/MobileApps';

import classes from './Footer.module.css';
const state = {
	categories: [
		'Desktops',
		'Laptops & Notebooks',
		'Components',
		'Tablets',
		'Software',
		"Phones & PDA's",
		'Cameras'
	],
	customerCare: [
		'Contact Us',
		'Storelocator',
		'Delivery Information',
		'Privacy Policy',
		'Terms & Conditions'
	]
};

const Footer = props => {
	const scrolltotop = e => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	return (
		<footer className={classes.footer}>
			<div className={classes.container + ' container'}>
				<div className="row justify-content-center">
					<div className="col-10 col-sm-6 col-lg-3">
						<div className="store-img">
							<Link to="/">
								<img
									src="https://halcikastore.herokuapp.com/img/halcstore.png"
									height="100"
									alt=""
								/>
							</Link>
						</div>
						<div className={classes.contactFooter}>
							<div className={classes.iconFooterCall}>
								<i className="fas fa-phone" />
							</div>
							<div className={classes.infoFooter}>
								<p className={classes.questions}>
									Got Questions ? Call us 24/7!
								</p>
								<p className={classes.phone}>
									Call Us: <br />
									{props.details.phone}
								</p>
								<p className={classes.address}>{props.details.address}</p>
							</div>
						</div>
						<FooterSocialIcons icons={props.icons} />
					</div>
					<div className="col-10 col-sm-6 col-lg-3">
						<h5 className={classes.h5}>Find By Categories</h5>
						<FooterList items={state.categories} />
					</div>
					<div className="col-10 col-sm-6 col-lg-3">
						<h5 className={classes.h5}>Customer Care</h5>
						<FooterList items={state.customerCare} />
					</div>
					<div className="col-10 col-sm-6 col-lg-3">
						<h5 className={classes.h5 + ' ' + classes.signup}>
							Sign Up To New Letter
						</h5>
						<p className={classes.signup}>
							Make sure that you never miss our interesting news by joining our
							newsletter program
						</p>
						<div className={classes.inputGroup}>
							<input
								type="email"
								className={classes.formControl}
								placeholder="Your Email"
							/>
						</div>
						<div className={classes.footerCards}>
							<i className="fab fa-cc-paypal" />
							<i className="fab fa-cc-discover" />
							<i className="fab fa-cc-visa" />
							<i className="fab fa-cc-mastercard" />
							<i className="fab fa-cc-amex" />
						</div>
					</div>
					<MobileApps />
				</div>
			</div>
			<div className={classes.containerFluid + ' container-fluid'}>
				<div className={classes.container + ' container'}>
					<div className={classes.row + ' row'}>
						<p>All Rights Reserved © Halc Store 2018</p>
						<a
							className="float-right back-to-top"
							href="/"
							onClick={scrolltotop}>
							<i className="fas fa-arrow-up" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default React.memo(Footer);
