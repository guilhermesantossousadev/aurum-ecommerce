import React, { useState, useEffect } from 'react';
import '../styles/ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel__container">
        <button className="carousel__button prev" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="carousel__image-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel__slide ${index === currentIndex ? 'active' : ''}`}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        <button className="carousel__button next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Miniaturas abaixo */}
      <div className="carousel__thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`carousel__thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
