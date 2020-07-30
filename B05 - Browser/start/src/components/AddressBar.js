import React, { useState, useEffect } from 'react';

const addHttps = (url) => {
  let newUrl = url;
  if (url.startsWith('http://')) {
    newUrl = 'https://' + url.slice(7);
    console.log(newUrl);
  } else if (!url.startsWith('https://')) {
    newUrl = 'https://' + url;
    console.log('addHttps -> newUrl', newUrl);
  }
  console.log('addHttps -> final newUrl', newUrl);
  return newUrl;
};

export default function AddressBar({ update, url }) {
  const [value, setValue] = useState(url || '');

  useEffect(() => {
    setValue(url);
  }, [url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = addHttps(value);
    update(url);
  };

  return (
    <div className="address-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          name="url"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
