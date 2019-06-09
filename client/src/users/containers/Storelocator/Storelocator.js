import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';
import c from './Storelocator.module.css';
import Map from './Map';

const StoreLocator = props => {
	const [location, setLocation] = useState({ lat: '', lng: '' });
	const [stores, setStores] = useState([]);
	const [markers, setMarkers] = useState([]);
	const [store, setStoreToShow] = useState({});

	useEffect(() => {
		document.title = 'Storelocator';
		props.getStores();
	}, []);

	useEffect(() => {
		setStores(props.stores);
	}, [props.stores]);

	useEffect(() => {
		if (stores.length > 0) {
			setLocation({ ...stores[0].stores[0].stores[0].location });
			setStoreToShow({ ...stores[0].stores[0].stores[0] });
			const markers = stores[0].stores[0].stores.map((stores, j) => ({
				...stores.location,
				index: 0,
				i: 0,
				j
			}));
			setMarkers(markers);
		}
	}, [stores]);

	const showStore = (e, index, i, j) => {
		e.preventDefault();
		setStoreToShow({ ...stores[index].stores[i].stores[j] });
		setLocation({ ...stores[index].stores[i].stores[j].location });
		const markers = stores[index].stores[i].stores.map((stores, j) => ({
			...stores.location,
			index,
			i,
			j
		}));
		setMarkers(markers);
	};

	return (
		<React.Fragment>
			<div className="container-fluid breadcrum">
				<div className="container">
					<div className="inline-nav">
						<Link to="/">Home</Link>
						<i className="fas fa-long-arrow-alt-right" />
						<a className="prevent-click" href="/">
							Store Locator
						</a>
					</div>
				</div>
			</div>

			<div className={c.containerfluid + ' container-fluid ' + c.storelocator}>
				<div className={c.row + ' row'} style={{ padding: 0 }}>
					<div className={c.colxl3 + ' col-xl-3'}>
						<h5>Store Locator</h5>
						<ul className={c.countries}>
							{stores.map((countries, index) => (
								<li key={countries._id}>
									<a
										className={c.country}
										data-toggle="collapse"
										href={'#' + countries._id}
										role="button"
										aria-expanded="false">
										{countries._id}
									</a>
									<ul className={c.collapse + ' collapse'} id={countries._id}>
										{countries.stores.map((city, i) => (
											<li key={city._id.city}>
												<a
													className={c.city}
													data-toggle="collapse"
													href={'#' + city._id.city}
													role="button"
													aria-expanded="false">
													{city._id.city}
												</a>
												<ul
													className={c.collapse + ' collapse'}
													id={city._id.city}>
													{city.stores.map((store, j) => (
														<li key={store._id}>
															<a
																className={c.city}
																href="/"
																onClick={e => showStore(e, index, i, j)}>
																{store.address}
															</a>
														</li>
													))}
												</ul>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
					{Object.keys(store).length > 0 && (
						<div className={c.colxl2 + ' col-xl-2 ' + c.storedescription}>
							<h6>{store.country}</h6>
							<h6 className="mb-4">{store.city}</h6>
							<img src={store.picture} alt={store.address} />
							<h6>Address</h6>
							<p className={c.addressparagraph}>{store.address}</p>
							<h6>Phone</h6>
							<p>{store.phone}</p>
							<h6>Email</h6>
							<p>{store.email}</p>
							<h6>Opening Hours</h6>
							<p>
								Mon-Fri: {store.weekHours.from} - {store.weekHours.to}
							</p>
							<p>
								Saturday: {store.saturdayHours.from} - {store.saturdayHours.to}
							</p>
						</div>
					)}
					<div className={c.colxl7 + ' col-xl-7'} style={{ padding: 0 }}>
						<div
							id="map-container"
							style={{ height: '600px', position: 'relative' }}>
							<Map location={location} markers={markers} />
						</div>
					</div>
				</div>
			</div>

			<ContainerIcons />
		</React.Fragment>
	);
};

const mapSatateToProps = state => ({
	stores: state.stores.stores
});

const dispatchMapToProps = dispatch => {
	return {
		getStores: () => dispatch(actions.getStoresFront())
	};
};

export default connect(
	mapSatateToProps,
	dispatchMapToProps
)(StoreLocator);
