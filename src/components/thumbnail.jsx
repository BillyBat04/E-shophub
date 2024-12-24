/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css'; // Import Splide CSS

const SplideSlider = ({ product }) => {
  useEffect(() => {
    if (product?.featuresImages?.length) {
      const splideCheck = document.getElementById("main-slider");
  
      if (splideCheck) {
        console.log(`Splide is present`);
  
        // Xóa các instance Splide cũ nếu tồn tại
        splideCheck.splide?.destroy();
  
        const main = new Splide("#main-slider", {
          fixedWidth: 400,
          type: "fade",
          rewind: true,
          pagination: false,
          arrows: false,
        });
  
        const thumbnails = new Splide("#thumbnail-slider", {
          fixedWidth: 100,
          gap: 30,
          arrows: true,
          rewind: true,
          pagination: false,
          focus: "center",
          isNavigation: true,
        });
  
        main.sync(thumbnails);
        main.mount();
        thumbnails.mount();
      } else {
        console.log(`Splide is NOT present`);
      }
    }
  }, [product?.featuresImages]); // Depend on the `product` prop to re-run when it changes

  return (
    <div>
      {/* Main Slider */}
      <div id="main-slider" className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            {product?.featuresImages?.map((image, index) => {
              return (
                <li key={index} className="splide__slide">
                  <img src={image} alt={`Slide ${index + 1}`} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Thumbnail Slider */}
      <div id="thumbnail-slider" className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            {product?.featuresImages?.map((image, index) => {
              return (
                <li key={index} className="splide__slide">
                  <img src={image} alt={`Slide ${index + 1}`} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SplideSlider;
