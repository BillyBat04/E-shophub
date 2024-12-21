import { Link, useParams } from "react-router-dom";
import { Input, TextareaAutosize } from "@mui/base";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const ProductDetail = ({ id }) => {
  const { productId } = useParams();
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
    const current = document.getElementById("selected-extra-image");
    if (current) {
      current.removeAttribute("id");
    }
    e.target.setAttribute("id", "selected-extra-image");
    currentSelectedImage.current = e.target.getAttribute("src");
    descTextArea.current.value =
      extraImagesDescription[currentSelectedImage.current];
  };

  const extraImageDescOnChange = (e) => {
    extraImagesDescription[currentSelectedImage.current] = e.target.value;
  };

  const deleteExtraImage = (url) => () => {
    currentSelectedImage.current = null;
    delete extraImagesDescription.url;
    setExtraImages((cur) => cur.filter((u) => u !== url));
  };

  return (
    <div className="text-sm bg-customGray3">
      <div className="text-base grid lg:grid-cols-[repeat(3,_1fr)] items-center p-6 bg-white shadow-md rounded-[20px]">
        <Link className='flex items-center' to="..">
          <button className="w-[200px] mr-auto text-gray-600 text-lg">&#8592; Product {productId}</button>
        </Link>
        <p className="text-base font-semibold justify-self-center">
          PRODUCT DETAIL
        </p>
      </div>
      <form action="" className="mt-6 grid grid-cols-[1fr_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base font-semibold mb-3">General Infomation</h3>
            <h5 className='font-normal text-slate-400 mb-2'>Product Name</h5>
            <Input
              id="product-name"
              slotProps={{
                input: {
                  className:
                    "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                },
              }}
              placeholder="Nhập tên sản phẩm"
            />
            <h5 className='mt-5 font-normal text-slate-400 mb-2'>Description</h5>
            <TextareaAutosize
              id="product-description"
              minRows={8}
              maxRows={8}
              className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black"
              placeholder="Mô tả sản phẩm..."
            />
          </fieldset>
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <div className="flex items-center gap-4">
              <h3 className="text-base font-semibold">Pricing</h3>
              <button
                className="border border-blue-700 px-3 py-1 rounded-md text-blue-700"
                type="button"
                onClick={addPriceOption}>
                Add Option
              </button>
            </div>
            {priceOptions.map((option) => {
              return (
                <div key={option.id} className="flex gap-4 mt-3">
                  <div className="flex-grow">
                    <h5 className='font-normal text-slate-400 mb-2' htmlFor={`option-${option.id}`}>Option</h5>
                    <Input
                      id={`option-${option.id}`}
                      slotProps={{
                        input: {
                          className:
                            "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                        },
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <h5 className='font-normal text-slate-400 mb-2' htmlFor={`price-${option.id}`}>Price</h5>
                    <Input
                      id={`price-${option.id}`}
                      slotProps={{
                        input: {
                          className:
                            "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
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
            <h3 className="text-base mb-3 font-semibold">Inventory</h3>
            <div className="flex gap-4">
              <div className="flex-grow">
              <h5 className=' font-normal text-slate-400 mb-2'>SKU</h5>
                <Input
                  readOnly
                  id="sku"
                  slotProps={{
                    input: {
                      className:
                        "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                    },
                  }}
                />
              </div>
              <div className="flex-grow">
              <h5 className='font-normal text-slate-400 mb-2'>Quantity</h5>
                <Input
                  disabled
                  id="stock"
                  slotProps={{
                    input: {
                      className:
                        "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                    },
                  }}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="flex flex-col gap-4">
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Product Media</h3>

            <h5 className='font-normal text-slate-400 mb-2'>Main Photo</h5>

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
                  {featuredImage ? "Change Image" : "Upload Image"}
                </p>
              </label>
              {featuredImage && (
                <button
                  type="button"
                  onClick={removeFeaturedImage}
                  className="border border-red-500 px-3 py-1 rounded-md text-red-600">
                  Delete
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
            <h5 className='font-normal flex-grow text-slate-400 mb-2'>Feature Photo</h5>
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
                          Delete
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
                  placeholder="Description"
                />
              </>
            )}
          </fieldset>
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Category</h3>
            <div className="flex gap-4">
              <div className="flex-grow space-y-2">
              <h5 className='font-normal text-slate-400 mb-2'>Product Category</h5>
                <select
                  className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                  id="product-category">
                  <option value="laptop">Laptop</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="headphone">Headphone</option>
                  <option value="mouse">Mouse</option>
                </select>
              </div>
              <div className="flex-grow space-y-2">
              <h5 className='font-normal text-slate-400 mb-2'>Brand</h5>
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
            <span>Save Information</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
