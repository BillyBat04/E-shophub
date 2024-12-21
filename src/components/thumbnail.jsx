import React, { useEffect } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css'; // Import Splide CSS

const SplideSlider = ({product}) => {
    var splideCheck = document.getElementById("main-slider");
if (splideCheck) {
    console.log(`Splide is present`);

    var main = new Splide("#main-slider", {
        type: "fade",
        rewind: true,
        pagination: false,
        arrows: false,
    });

    var thumbnails = new Splide("#thumbnail-slider", {
        fixedWidth: 100,
        gap: 10,
        arrows: true,
        rewind: true,
        pagination: false,
        focus: "center",
        isNavigation: true,
        breakpoints: {
            600: {
                fixedWidth: 60,
            },
        },
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
} else {
    console.log(`Splide is NOT present`);
}

  return (
    <div>
      {/* Main Slider */}
      <div id="main-slider" className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            {product?.featuresImages?.map((image, index) => {
                return (
                    <li className="splide__slide">
                        <img src={image} alt="Slide 1" />
                    </li>
                )
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
                    <li className="splide__slide">
                        <img src={image} alt="Slide 1" />
                    </li>
                )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SplideSlider;
