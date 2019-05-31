import React from 'react';

import classes from './FluidIcons.module.css'

const FluidIcons = () => 
            <div className={classes.icons + " container-fluid icons"}>
				<div className="container icons">
					<div className="row">
						<div className="col-12 col-sm-6 col-lg-3">
							<i className="fas fa-truck" />
							<h5>Worldwide Shipping</h5>
							<p>Free Shipping On Order Over $100</p>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<i className="fas fa-headphones" />
							<h5>Order Online Service</h5>
							<p>Free return products in 30 days</p>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<i className="far fa-credit-card" />
							<h5>Payment</h5>
							<p>Secure System</p>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<i className="fas fa-redo-alt" />
							<h5>Return 30 Days</h5>
							<p>Free return products in 30 days</p>
						</div>
					</div>
				</div>
			</div>

export default FluidIcons;