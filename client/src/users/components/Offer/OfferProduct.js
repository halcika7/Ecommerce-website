import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OfferProduct = ({ product, weekly }) => {
	const [time, setTime] = useState({ d: '', h: '', m: '', s: '' });

	useEffect(() => {
		const loop = setInterval(countdown, 1000);
		return () => {
			clearInterval(loop);
		};
	}, []);

	const countdown = () => {
		const now = new Date();
		const eventDate = new Date(
			!weekly ? product.dailyOffer.expires : product.weeklyOffer.expires
		);

		const remTime = eventDate.getTime() - now.getTime();

		let s = Math.floor(remTime / 1000);
		let m = Math.floor(s / 60);
		let h = Math.floor(m / 60);
		let d = Math.floor(h / 24);

		h %= 24;
		m %= 60;
		s %= 60;

		h = h < 10 ? '0' + h : h;
		m = m < 10 ? '0' + m : m;
		s = s < 10 ? '0' + s : s;

		setTime({ d, h, m, s });
	};

	return (
		<div className="col-12 mt-4">
			<div className="row">
				<div className="left-part col-lg-4 weekly-offer">
					<div className="head">
						<h5>Special Offer</h5>
					</div>
					<div className="count-down">
						{weekly && (
							<div className="day">
								<div className="number days">{time.d}</div>
								<div className="text">Days</div>
							</div>
						)}
						<div className="hour">
							<div className="number hours">{time.h}</div>
							<div className="text">Hours</div>
						</div>
						<div className="minute">
							<div className="number minutes">{time.m}</div>
							<div className="text">Minutes</div>
						</div>
						<div className="second">
							<div className="number seconds">{time.s}</div>
							<div className="text">Seconds</div>
						</div>
					</div>
				</div>
				<div className="right-part col-lg-8 weekly-offer">
					<div className="content">
						<div className="picture">
							<img src={product.options[0].featuredPicture} alt="" />
						</div>
						<div className="description">
							<Link to={`/product?id=${product._id}`}>
								<h5>{product.name}</h5>
							</Link>
							<p>{product.smalldescription}</p>
							<div className="price">
								<p className="new-price">Starting from: ${product.price}</p>
							</div>
							<div className="product-buttons">
								<Link to={`/product?id=${product._id}`}>View Product</Link>
							</div>
						</div>
					</div>
					<span>
						Discount{' '}
						{!weekly
							? product.dailyOffer.discount
							: product.weeklyOffer.discount}
						%
					</span>
				</div>
			</div>
		</div>
	);
};

export default OfferProduct;
