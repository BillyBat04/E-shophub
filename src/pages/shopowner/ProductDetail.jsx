import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Input, TextareaAutosize } from "@mui/base";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const ProductDetail = ({ id }) => {
  // option for prices
  const [priceOptions, setPriceOptions] = useState([{ id: 0 }]);
  const priceOptionCount = useRef(1);

  const addPriceOption = () => {
    setPriceOptions((prevOptions) => [
      ...prevOptions,
      { id: priceOptionCount.current },
    ]);

    priceOptionCount.current += 1;
  };

  const removePriceOption = (id) => () => {
    setPriceOptions((options) => options.filter((option) => option.id !== id));
  };

  // featured image
  const [featuredImage, setFeaturedImage] = useState(null);

  const changeFeaturedImage = (e) => {
    const file = e.target.files[0]; // get image
    if (file) {
      const imageUrl = URL.createObjectURL(file); // create temp URL
      setFeaturedImage(imageUrl); // update URL
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
  };

  // extra images
  const [extraImages, setExtraImages] = useState([]);
  const extraImagesDescription = useRef({});
  const currentSelectedImage = useRef();
  const descTextArea = useRef(null);

  const handleExtraImagesChange = (e) => {
    const files = [...e.target.files];
    if (files.length === 0) {
      return;
    }

    const newUrls = files.map((file) => URL.createObjectURL(file));
    newUrls.forEach((url) => {
      extraImagesDescription[url] = "";
    });

    setExtraImages((prevUrls) => [...prevUrls, ...newUrls]);
  };

  const extraImageOnClick = (e) => {
    // find current and remove id from it
    const current = document.getElementById("selected-extra-image");
    if (current) {
      current.removeAttribute("id");
    }

    // add id to newfsafdsa
    e.target.setAttribute("id", "selected-extra-image");

    // change current state to idString
    currentSelectedImage.current = e.target.getAttribute("src");

    // fill textarea with new description
    descTextArea.current.value =
      extraImagesDescription[currentSelectedImage.current];
  };

  const extraImageDescOnChange = (e) => {
    // find current selected image and change its value to new description
    extraImagesDescription[currentSelectedImage.current] = e.target.value;
  };

  const deleteExtraImage = (url) => () => {
    // change currentSelectedImage to null
    // delete from extraImagesDescription
    // remove from array
    currentSelectedImage.current = null;
    delete extraImagesDescription.url;
    setExtraImages((cur) => cur.filter((u) => u !== url));
  };

  return (
    <div className="text-sm bg-customGray3">
      <div className="text-base grid lg:grid-cols-[repeat(3,_1fr)] items-center p-6 bg-white shadow-md rounded-[20px]">
        <Link className="flex items-center gap-2 hover:underline" to="..">
          <IoChevronBack className="w-6 h-6"></IoChevronBack>
          <span>Danh sách</span>
        </Link>
        <p className="text-base font-semibold justify-self-center">
          THÔNG TIN SẢN PHẨM
        </p>
      </div>
      <form action="" className="mt-6 grid grid-cols-[1fr_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base font-semibold mb-3">Thông tin chung</h3>
            <label htmlFor="product-name">Tên sản phẩm</label>
            <Input
              id="product-name"
              slotProps={{
                input: {
                  className:
                    "w-full text-sm leading-normal p-2 rounded-lg bg-slate-200 focus:shadow-lg border border-black focus-visible:outline-0 mt-1 mb-3",
                },
              }}
              placeholder="Nhập tên sản phẩm"
            />
            <label htmlFor="product-description" className="">
              Mô tả sản phẩm
            </label>
            <br />
            <TextareaAutosize
              id="product-description"
              minRows={8}
              maxRows={8}
              className="w-full resize-none text-sm leading-normal p-2 rounded-lg bg-slate-200 focus:shadow-lg border border-black focus-visible:outline-0 mt-1"
              placeholder="Mô tả sản phẩm..."
            />
          </fieldset>
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <div className="flex items-center gap-4">
              <h3 className="text-base font-semibold">Giá bán</h3>
              <button
                className="border border-blue-700 px-3 py-1 rounded-md text-blue-700"
                type="button"
                onClick={addPriceOption}>
                Thêm phân loại
              </button>
            </div>
            {priceOptions.map((option) => {
              return (
                <div key={option.id} className="flex gap-4 mt-3">
                  <div className="flex-grow">
                    <label htmlFor={`option-${option.id}`}>Phân loại</label>
                    <Input
                      id={`option-${option.id}`}
                      slotProps={{
                        input: {
                          className:
                            "w-full text-sm leading-normal p-2 rounded-lg bg-slate-200 focus:shadow-lg border border-black focus-visible:outline-0 mt-1",
                        },
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <label htmlFor={`price-${option.id}`}>Giá</label>
                    <Input
                      id={`price-${option.id}`}
                      slotProps={{
                        input: {
                          className:
                            "w-full text-sm leading-normal p-2 rounded-lg bg-slate-200 focus:shadow-lg border border-black focus-visible:outline-0 mt-1",
                        },
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="w-7 h-7 p-1 self-center mt-4"
                    onClick={removePriceOption(option.id)}>
                    <RxCross2 className="w-6 h-6" />
                  </button>
                </div>
              );
            })}
          </fieldset>
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Kho hàng</h3>
            <div className="flex gap-4">
              <div className="flex-grow">
                <label htmlFor="sku">SKU</label>
                <Input
                  readOnly
                  id="sku"
                  slotProps={{
                    input: {
                      className:
                        "w-full text-sm leading-normal p-2 rounded-lg bg-slate-200 focus:shadow-lg border border-black focus-visible:outline-0 mt-1",
                    },
                  }}
                />
              </div>
              <div className="flex-grow">
                <label htmlFor="stock">Tồn kho</label>
                <Input
                  disabled
                  id="stock"
                  slotProps={{
                    input: {
                      className:
                        "w-full text-sm leading-normal p-2 rounded-lg bg-slate-200 focus:shadow-lg border border-black focus-visible:outline-0 mt-1",
                    },
                  }}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="flex flex-col gap-4">
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Ảnh sản phẩm</h3>

            <h4 className="flex-grow mb-2" htmlFor="featured-image">
              Ảnh nổi bật
            </h4>

            {featuredImage && (
              <>
                <img
                  className="h-[200px] rounded-md"
                  src={featuredImage}
                  alt="Featured image"
                />
              </>
            )}
            <div className="flex gap-2 mt-2">
              <label htmlFor="featured-image">
                <p className="border border-blue-700 px-3 py-1 rounded-md text-blue-700 hover:cursor-pointer">
                  {featuredImage ? "Thay ảnh" : "Tải ảnh lên"}
                </p>
              </label>
              {featuredImage && (
                <button
                  type="button"
                  onClick={removeFeaturedImage}
                  className="border border-red-500 px-3 py-1 rounded-md text-red-600">
                  Xoá
                </button>
              )}
              <input
                id="featured-image"
                type="file"
                accept="image/*"
                onChange={changeFeaturedImage}
                hidden
              />
            </div>
            <div className="mt-3 flex items-end">
              <h4 className="flex-grow">Ảnh phụ</h4>
              <label htmlFor="extra-images">
                <p className="border border-blue-700 px-3 py-1 rounded-md text-blue-700 hover:cursor-pointer">
                  {extraImages.length > 0 ? "Thêm ảnh" : "Tải ảnh lên"}
                </p>
              </label>
              <input
                id="extra-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleExtraImagesChange}
                hidden
              />
            </div>
            {extraImages.length > 0 && (
              <>
                <div className="my-2 pb-2 flex gap-2 overflow-y-auto">
                  {extraImages.map((url) => {
                    return (
                      <div
                        className="flex-shrink-0 flex flex-col gap-1"
                        key={url}>
                        <button type="button" onClick={extraImageOnClick}>
                          <img
                            className="h-[200px] w-[150px] object-cover rounded-md"
                            src={url}
                            alt="Extra product image"
                          />
                        </button>
                        <button
                          className="border border-red-500 px-3 py-1 rounded-md text-red-600"
                          onClick={deleteExtraImage(url)}>
                          Xoá
                        </button>
                      </div>
                    );
                  })}
                </div>
                <TextareaAutosize
                  ref={descTextArea}
                  onChange={extraImageDescOnChange}
                  minRows={5}
                  maxRows={5}
                  className="w-full flex-grow resize-none text-sm leading-normal p-2 rounded-lg bg-slate-200 focus:shadow-lg border border-black focus-visible:outline-0"
                  placeholder="Mô tả ảnh..."
                />
              </>
            )}
          </fieldset>
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Phân loại</h3>
            <div className="flex gap-4">
              <div className="flex-grow space-y-2">
                <label htmlFor="product-category">Loại sản phẩm</label>
                <select
                  className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                  id="product-category">
                  <option value="laptop">Laptop</option>
                  <option value="smartphone">Điện thoại</option>
                  <option value="headphone">Tai nghe</option>
                  <option value="mouse">Chuột</option>
                </select>
              </div>
              <div className="flex-grow space-y-2">
                <label htmlFor="product-brand">Thương hiệu</label>
                <select
                  className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                  id="product-brand">
                  <option value="laptop">Apple</option>
                  <option value="smartphone">Samsung</option>
                  <option value="headphone">Acer</option>
                  <option value="mouse">Logitech</option>
                </select>
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-max self-end bg-black text-white text-base px-8 py-3 rounded-lg shadow-md">
            <span>Lưu thông tin</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
