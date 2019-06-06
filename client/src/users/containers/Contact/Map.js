import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import SmallSpinner from '../../components/UI/SmallSpinner/SmallSpinner';

const Mapp = props => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, [props]);

  useEffect(() => {
    setLoading(true);
    if(props.location.lat) {
      setTimeout(() => {
        setLoading(false);
      },2000)
    }
  }, [props.location]);

    return (
         <React.Fragment>
         {!loading ? 
           <Map
           google={props.google}
           zoom={14}
           initialCenter={{ lat: props.location.lat, lng: props.location.lng}}
         >
           <Marker position={{lat: props.location.lat,lng: props.location.lng}} 
             icon={{ url: '/public/map.png',scaledSize: {width: 60, height: 76}, }} />
         </Map> : 
         <SmallSpinner />}
       </React.Fragment>
    );
}

export default GoogleApiWrapper({apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY})(Mapp);