import React, { useState, useEffect } from 'react';

// google maps api
const geocode_api_key = process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY;
const geocode_endpoint = 'https://maps.googleapis.com/maps/api/geocode/json';

// component to input city from form, convert to lat long
// https://developers.google.com/maps/documentation/geocoding/overview?hl=en_US
// https://stackoverflow.com/questions/tagged/google-geocoding-api
export default function GeoForm({ updateLatLong }) {
  const [address, setAddress] = useState('4521 17th St., San Francisco 94114');
  const [lookup, setLookup] = useState(false);

  useEffect(() => {
    if (address && lookup) {
      geoCodeAddress();
    }
    setLookup(false);
  }, [address, lookup]);

  async function geoCodeAddress() {
    const query = `address=${encodeURI(address)}&key=${geocode_api_key}`;

    const response = await fetch(`${geocode_endpoint}?${query}`, {
      // headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // we have data!
    console.log('GeoForm: geoCodeAddress: ', data);
    console.dir(data);

    const {
      status,
      results: [{ address_components, formatted_address, geometry }],
    } = data;

    console.log('GeoForm -> status', status);

    console.log('GeoForm -> geometry', geometry);
    console.log('GeoForm -> formatted_address', formatted_address);
    console.log('GeoForm -> address_components', address_components);

    const { lat = '', lng: long = '' } = geometry.location;
    console.log('GeoForm -> lat', lat);
    console.log('GeoForm -> long', long);

    const latLong = {
      status,
      lat,
      long,
    };
    console.log('GeoForm -> latLong', latLong);

    updateLatLong(latLong);
  }

  const lookupAddress = (e) => {
    e.preventDefault();
    console.log('address', address);
    setLookup(true);
  };

  return (
    <form onSubmit={lookupAddress}>
      <input
        type="text"
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button>locate</button>
    </form>
  );
}
