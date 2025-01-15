import { Link, useNavigate, useParams } from "react-router-dom";
import { Input, TextareaAutosize } from "@mui/base";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios';
import axiosInstance from "../../config/api";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [supplier, setSupplier] = useState('');

  const [product, setProduct] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brands, setBrands] = useState([]);

  const [featuredImage, setFeaturedImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const changeFeaturedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFeaturedImage(imageUrl);
      setMainImage(file);
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
  };

  const [extraImages, setExtraImages] = useState([]);
  const [featuredImages, setFeaturedImages] = useState([]);
  const extraImagesDescription = useRef({});
  const currentSelectedImage = useRef();

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
    setFeaturedImages(files);
  };

  const extraImageOnClick = (e) => {
    const current = document.getElementById("selected-extra-image");
    if (current) {
      current.removeAttribute("id");
    }
    e.target.setAttribute("id", "selected-extra-image");
    currentSelectedImage.current = e.target.getAttribute("src");
  };

  const deleteExtraImage = (url) => () => {
    currentSelectedImage.current = null;
    delete extraImagesDescription.url;
    setExtraImages((cur) => cur.filter((u) => u !== url));
  };

  const handleCategoryChange = async (categoryName = '') => {
    const response = await axiosInstance.get(`/brand/${categoryName}`);
    setBrands(response.data);
  };

  const getProduct = useCallback(async () => {
    const response = await axiosInstance.get(`/product/${productId}`);
    setProduct(response.data);
    setFeaturedImage(response.data.image);
    setExtraImages(response.data.featuresImages);
    handleCategoryChange(response.data.categoryId);
  }, [productId]);

  const getSuppliers = useCallback(async () => {
    const response = await axiosInstance.get('/supplier');
    setSuppliers(response.data);
  }, []);

  const getCategoryList = useCallback(async () => {
    const response = await axiosInstance.get('/category');
    setCategoryList(response.data);
  }, []);

  useEffect(() => {
    getProduct();
    getSuppliers();
    getCategoryList();
  }, [getProduct, getSuppliers, getCategoryList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (mainImage) data.append('images', mainImage);
    if (featuredImages.length > 0) {
      for (const img of featuredImages) {
        data.append('images', img);
      }
    }

    if (productName) data.append('productName', productName);
    if (purchasePrice > 0) data.append('purchasePrice', purchasePrice);
    if (sellingPrice > 0) data.append('sellingPrice', sellingPrice);
    if (supplier) data.append('supplierId', supplier);
    if (category) data.append('categoryId', category);
    if (description) data.append('description', description);
    if (brand) data.append('brand', brand);

    const response = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/product/${productId}`,
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response.status) {
      navigate("/admin/products");
      window.location.reload();
    }
  };

  return (
    <div className="text-sm bg-customGray3">
      <div className="text-base grid lg:grid-cols-[repeat(3,_1fr)] items-center p-6 bg-white shadow-md rounded-[20px]">
        <Link className='flex items-center' to="..">
          <button className="w-[200px] mr-auto text-gray-600 text-lg">&#8592; Sản phẩm {productId}</button>
        </Link>
        <p className="text-base font-semibold justify-self-center">
          CHI TIẾT SẢN PHẨM
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-[1fr_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base font-semibold mb-3">Thông tin chung</h3>
            <h5 className='font-normal text-slate-400 mb-2'>Tên sản phẩm</h5>
            <Input
              id="product-name"
              slotProps={{
                input: {
                  className:
                    "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                },
              }}
              placeholder="Nhập tên sản phẩm"
              value={productName || product?.productName}
              onChange={e => setProductName(e.target.value)}
            />
            <h5 className='mt-5 font-normal text-slate-400 mb-2'>Mô tả</h5>
            <TextareaAutosize
              id="product-description"
              minRows={8}
              maxRows={8}
              className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black"
              placeholder="Mô tả sản phẩm..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </fieldset>
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <div className="flex items-center gap-4">
              <h3 className="text-base font-semibold">Giá</h3>
            </div>
            <div className="flex gap-4 mt-3">
              <div className="flex-grow">
                <h5 className='font-normal text-slate-400 mb-2'>Giá nhập</h5>
                <Input
                  slotProps={{
                    input: {
                      className:
                        "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                    },
                  }}
                  value={purchasePrice || product?.purchasePrice}
                  onChange={e => setPurchasePrice(e.target.value)}
                />
              </div>
              <div className="flex-grow">
                <h5 className='font-normal text-slate-400 mb-2'>Giá bán</h5>
                <Input
                  slotProps={{
                    input: {
                      className:
                        "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                    },
                  }}
                  value={sellingPrice || product?.sellingPrice}
                  onChange={e => setSellingPrice(e.target.value)}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Nhà cung cấp</h3>
            <div className="flex-grow space-y-2">
              <select
                onChange={e => setSupplier(e.target.value)}
                className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                id="product-category">
                <option>Chọn nhà cung cấp</option>
                {suppliers.map((supplier, index) => {
                  return (
                    <option key={index} value={supplier.id} selected={supplier.supplierName === product?.supplier.supplierName} >{supplier.supplierName}</option>
                  )
                })}
              </select>
            </div>
          </fieldset>
        </div>
        <div className="flex flex-col gap-4">
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Hình ảnh sản phẩm</h3>

            <h5 className='font-normal text-slate-400 mb-2'>Ảnh chính</h5>

            {featuredImage && (
              <>
                <img
                  className="h-[200px] rounded-md"
                  src={featuredImage}
                  alt="Ảnh chính"
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
                  Xóa
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
              <h5 className='font-normal flex-grow text-slate-400 mb-2'>Ảnh chi tiết</h5>
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
                            alt="Ảnh sản phẩm khác"
                          />
                        </button>
                        <button
                          className="border border-red-500 px-3 py-1 rounded-md text-red-600"
                          onClick={deleteExtraImage(url)}>
                          Xóa
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </fieldset>
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Danh mục</h3>
            <div className="flex gap-4">
              <div className="flex-grow space-y-2">
                <h5 className='font-normal text-slate-400 mb-2'>Danh mục sản phẩm</h5>
                <select
                  onChange={e => { setCategory(e.target.value); handleCategoryChange(e.target.value) }}
                  className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                  id="product-category"
                >
                  <option value="" >Chọn danh mục</option>
                  {categoryList.map((item, index) => {
                    return (
                      <option key={index} value={item.id} selected={item.categoryName === product?.category.categoryName} >{item.categoryName}</option>
                    )
                  })}
                </select>
              </div>
              <div className="flex-grow space-y-2">
                <h5 className='font-normal text-slate-400 mb-2'>Thương hiệu</h5>
                <select
                  onChange={e => setBrand(e.target.value)}
                  className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                  id="product-brand">
                  <option value="">Chọn thương hiệu</option>
                  {brands.map((item, index) => {
                    return (
                      <option key={index} value={item.brandName} selected={item.brandName === product?.brand} >{item.brandName}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </fieldset>

          <button
            className="w-max self-end bg-black text-white text-base px-8 py-3 rounded-lg shadow-md"
            type="submit">
            <span>Xác nhận</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
