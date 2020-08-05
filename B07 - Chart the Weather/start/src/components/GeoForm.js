import React, { useState, useEffect, useCallback } from 'react';
import Geocode from 'react-geocode';

// google maps api
const geocode_api_key = process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY;
const geocode_endpoint = 'https://maps.googleapis.com/maps/api/geocode/json';

Geocode.setApiKey(geocode_api_key);

// component to input city from form, convert to lat long
// https://developers.google.com/maps/documentation/geocoding/overview?hl=en_US
// https://stackoverflow.com/questions/tagged/google-geocoding-api
export default function GeoForm({ updateLatLong }) {
  const [address, setAddress] = useState('4521 17th St., San Francisco 94114');
  const [lookup, setLookup] = useState(false);

  async function geoCodeAddress(address) {
    const query = `address=${encodeURI(address)}&key=${geocode_api_key}`;

    const response = await fetch(`${geocode_endpoint}?${query}`, {
      // headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log('GeoForm -> data', data);
    // we have data!

    const {
      status,
      results: [{ geometry }],
    } = data;

    const { lat = '', lng: long = '' } = geometry.location;
    const latLong = {
      status,
      lat,
      long,
    };

    updateLatLong(latLong);
  }

  const getGeoCodeAddress = useCallback((address) => {
    geoCodeAddress(address);
  }, []);

  useEffect(() => {
    console.log('UseEffect: address', address);

    Geocode.fromAddress(address).then((res) => {
      console.log('Geocode.fromAddress:res', res);
    });

    if (address && lookup) {
      getGeoCodeAddress(address);
    }
    setLookup(false);
  }, [address, lookup, getGeoCodeAddress]);

  const lookupAddress = (e) => {
    e.preventDefault();
    setLookup(true);
  };
  //  /*
  return (
    <form onSubmit={lookupAddress}>
      <input
        type="text"
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {/* <button>locate</button> */}
    </form>
  );
}
