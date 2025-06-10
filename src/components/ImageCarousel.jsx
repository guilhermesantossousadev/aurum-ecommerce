import React, { useState, useEffect } from 'react';
import '../styles/ImageCarousel.css';

import SetaRosaEsquerda from "../images/SetaRosaEsquerda.png"
import SetaRosaDireita from "../images/SetaRosaDireita.png"

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
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">
      {/* Imagem principal */}
      <div className="carousel__container">
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
      </div>

      {/* Miniaturas com setas laterais */}
      <div className="carousel__thumbnails-wrapper">
        <button className="carousel__button prev" onClick={prevSlide}>
          <img src={SetaRosaEsquerda} alt="seta" width="30px" />
        </button>
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
        <button className="carousel__button next" onClick={nextSlide}>
          <img src={SetaRosaDireita} alt="seta" width="30px" />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
