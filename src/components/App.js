import React, { Component } from 'react';
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from './services/image-api';
import { Button } from './Button/Button';

import { Circles } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// import { ToastContainer } from 'react-toastify';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    isLoading: false,
    images: [],
    showModal: false,
    fullSizeImg: '',
    isEndOfArray: false,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ images: [], searchQuery, page: 1 });
  };

  //   handleLoadMore = () => {
  //     this.setState(prevState => ({ page: prevState.page + 1 }));
  //   };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
    // if (prevQuery === nextQuery) {
    //   this.setState(prevState => ({ page: prevState.page + 1 }));
    //   this.fetchImages();
    // }
  }

  fetchImages = async () => {
    try {
      this.setState({ isLoading: true });
      const { searchQuery, page } = this.state;
      const { data } = await getImages(searchQuery, page);
      if (data.hits.length === 0) {
        alert(
          'Sorry, there are no images matching your search query. Please try again',
        );
        this.setState({ isLoading: false });
        return;
      }
      if (this.state.page > data.totalHits / 12) {
        alert('We are sorry, but you have reached the end of search results.');
        this.setState({ isEndOfArray: true, isLoading: false });
        return;
      }
      this.setState(prevState => ({
        isLoading: false,
        images: [...prevState.images, ...data.hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      fullSizeImg: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, fullSizeImg: '' });
  };

  render() {
    const {
      searchQuery,
      images,
      isLoading,
      fullSizeImg,
      showModal,
      isEndOfArray,
    } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
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
          <Button onLoadMoreClick={this.fetchImages} />
        )}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={fullSizeImg} alt={searchQuery} />
          </Modal>
        )}

        {/* <ToastContainer autoClose={3000} /> */}
      </div>
    );
  }
}

export default App;
