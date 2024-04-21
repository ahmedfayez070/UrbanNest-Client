import { useState } from "react";
import "./slider.scss";

const Slider = ({ images }) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [imgNumber, setImgNumber] = useState(0);
  const [count, setCount] = useState(0);

  const increaseImgNumber = () => {
    if (count === images.length - 1) {
      setCount(0);
      return;
    }
    setCount(count + 1);
  };

  const decreaseImgNumber = () => {
    if (count === 0) {
      setCount(images.length - 1);
      return;
    }
    setCount(count - 1);
  };

  return (
    <div className="slider">
      {openSlider && (
        <div className="full-slider">
          <div className="arrow">
            <img src="/arrow.png" alt="arrow" onClick={decreaseImgNumber} />
          </div>
          <div className="img">
            <img src={images[count]} alt="" />
          </div>
          <div className="arrow">
            <span className="close" onClick={() => setOpenSlider(false)}>
              X
            </span>
            <img
              src="/arrow.png"
              alt="arrow"
              className="right-arrow"
              onClick={increaseImgNumber}
            />
          </div>
        </div>
      )}
      <div className="big-img">
        <img
          src={images[imgNumber]}
          alt=""
          onClick={() => setOpenSlider(true)}
        />
      </div>
      <div className="small-imgs">
        {images.map((img, i) => {
          if (i < 3)
            return (
              <img src={img} alt="" onClick={() => setImgNumber(i)} key={i} />
            );
        })}
      </div>
    </div>
  );
};

export default Slider;
