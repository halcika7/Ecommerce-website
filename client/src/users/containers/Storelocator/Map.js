import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import SmallSpinner from '../../components/UI/SmallSpinner/SmallSpinner';

const Mapp = props => {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
	}, [props]);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [props.location]);

	const displayMarkers = () => {
		return props.markers.map((marker, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: marker.lat,
						lng: marker.lng
					}}
					icon={{
						url: '/public/map.png',
						scaledSize: { width: 60, height: 76 }
					}}
				/>
			);
		});
	};

	return (
		<React.Fragment>
			{!loading ? (
				<Map
					google={props.google}
					zoom={14}
					initialCenter={{ ...props.location }}>
					{displayMarkers()}
				</Map>
			) : (
				<SmallSpinner />
			)}
		</React.Fragment>
	);
};

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
})(Mapp);
