import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const API_URL = 'https://api.unsplash.com';
const PHOTO_LIMIT = 50;
const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const fetchPhotos = useCallback(() => {
    let apiUrl = `${API_URL}/photos?`;
    if (query) apiUrl = `${API_URL}/search/photos?query=${query}`;
    apiUrl += `&page=${page}`;
    apiUrl += `&client_id=${accessKey}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const imagesFromApi = data.results ?? data;

        // if page is 1, then we need a whole new array of images
        if (page === 1) {
          setImages(imagesFromApi);
          return;
        }

        // if page > 1, then we are adding for our infinite scroll
        setImages((images) => [...images, ...imagesFromApi]);
      });
  }, [page, query]);

  useEffect(() => {
    fetchPhotos();
  }, [page, fetchPhotos]);

  function searchPhotos(e) {
    e.preventDefault();
    setPage(1);
    fetchPhotos();
  }

  // return an error if there is no access key
  if (!accessKey) {
    return (
      <a href='https://unsplash.com/developers' className='error'>
        Required: Get Your Unsplash API Key First
      </a>
    );
  }

  const hasMore = images.length < PHOTO_LIMIT ? true : false;

  return (
    <div className='app'>
      <form onSubmit={searchPhotos}>
        <input
          type='text'
          placeholder='Search Unsplash...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>

      <InfiniteScroll
        dataLength={images.length} //This is important field to render the next data
        next={() => setPage((page) => page + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className='image-grid'>
          {images.map((photo, index) => (
            <a
              className='image'
              key={index}
              href={photo.links.html}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={photo.urls.regular} alt={photo.alt_description} />
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
