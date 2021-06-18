import React, { useState, useEffect } from 'react';
import errimage from '../../imgs/imagenot.png';

const Gallery = ({ gallery, mouseOut, changeImage }) => {
  const [images, setImages] = useState([]);
  const [initialIndex, setIndex] = useState(0);
  const [isRight, setRight] = useState(false);
  const [isLeft, setLeft] = useState(false);

  const stopper = -(images.length - 4);

  const pullPhotos = (gallery) => {
    const photos = gallery.map((item) => item.thumbnail_url)

    setImages(photos);

    photos.length > 4
    ? setRight(true)
    : setRight(false);
  };

  const handleClick = (action) => {
    if (action.type === 'previous') {
      setRight(true);
      setIndex(prevState => prevState + 1);
    } else if (action.type === 'next') {
      setLeft(true);

      (images.length > 3 && initialIndex > stopper)
      ? setIndex(prevState => prevState - 1)
      : null;
    }
  }

  useEffect(() => {
    gallery.length !== 0
    ? pullPhotos(gallery)
    : null;
  }, [gallery]);

  useEffect(() => {
    initialIndex === stopper
    ? setRight(false)
    : null;

    initialIndex === 0
    ? setLeft(false)
    : setLeft(true);
  }, [initialIndex]);

  return (
    <div className='gallery-container'>
      {isLeft
        ? <button className='g-button1' onClick={() => handleClick({ type: 'previous' })}>‹</button>
        : <button className='g-button2'>‹</button>
      }
      <div className='g-container' style={{ '--offset': initialIndex }}>
        {images.map((image, i) => (
        <span key={i} className='g-image-container' style={{ '--offset': initialIndex }}>
          <img className='gallery-image'
               src={image ? image : errimage}
               alt='thumbnail-image'
               onClick={()=> changeImage(i)}></img>
        </span>
        ))}
      </div>
      {isRight
        ? <button className='g-button1' onClick={() => handleClick({ type: 'next' })}>›</button>
        : <button className='g-button2'>›</button>
      }
    </div>
  );

};

export default Gallery;