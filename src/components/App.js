import { useState, useEffect } from 'react';

import './App.css';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from './services/image-api';
import { Button } from './Button/Button';

import { Circles } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// import { ToastContainer } from 'react-toastify';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fullSizeImg, setFullSizeImg] = useState('');
  const [isEndOfArray, setIsEndOfArray] = useState(false);

  const handleFormSubmit = searchQuery => {
    setImages([]);
    setSearchQuery(searchQuery);
    setPage(1);
  };

  const handleLoadMore = () => setPage(page => page + 1);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages();
  }, [page, searchQuery]);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const { data } = await getImages(searchQuery, page);
      if (data.hits.length === 0) {
        alert(
          'Sorry, there are no images matching your search query. Please try again',
        );
        setIsLoading(false);
        return;
      }
      if (page > data.totalHits / 12) {
        alert('We are sorry, but you have reached the end of search results.');
        setIsLoading(false);
        setIsEndOfArray(true);
        return;
      }
      setIsLoading(false);
      setImages(state => [...state, ...data.hits]);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setFullSizeImg(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setFullSizeImg('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && (
        <div className="Loader">
          <Circles
            color="#f07416"
            arialLabel="loading-indicator"
            height={80}
            width={80}
          />
        </div>
      )}
      {images.length !== 0 && !isEndOfArray && (
        <Button onLoadMoreClick={handleLoadMore} />
      )}
      {showModal && (
        <Modal onClose={closeModal} largeImage={fullSizeImg}></Modal>
      )}

      {/* <ToastContainer autoClose={3000} /> */}
    </div>
  );
}
