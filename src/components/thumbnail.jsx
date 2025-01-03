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
          fixedWidth: 300,
          type: "fade",
          rewind: true,
          pagination: false,
          arrows: false,
        });

        const thumbnails = new Splide("#thumbnail-slider", {
          fixedWidth: 80, // Giảm kích thước thumbnail
          gap: 10, // Giảm khoảng cách
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
    <div className="space-y-6">
      {/* Main Slider */}
      <div id="main-slider" className="splide mx-auto max-w-lg">
        <div className="splide__track ml-12">
          <ul className="splide__list">
            {product?.featuresImages?.map((image, index) => {
              return (
                <li key={index} className="splide__slide">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Thumbnail Slider */}
      <div id="thumbnail-slider" className="splide mx-auto max-w-sm">
        <div className="splide__track">
          <ul className="splide__list flex justify-center">
            {product?.featuresImages?.map((image, index) => {
              return (
                <li key={index} className="splide__slide">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 rounded-md object-cover border border-gray-200 hover:opacity-75 transition"
                  />
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
