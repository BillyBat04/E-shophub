import { Link, useNavigate, useParams } from "react-router-dom";
import { Input, TextareaAutosize } from "@mui/base";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios'
import axiosInstance from "../../config/api";
const CreateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate()
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [purchasePrice, setPurchasePrice] = useState(0)
  const [sellingPrice, setSellingPrice] = useState(0)
  const [supplier, setSupplier] = useState('')

  const [suppliers, setSuppliers] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [brands, setBrands] = useState([])
  // featured image
  const [featuredImage, setFeaturedImage] = useState(null);
  const [mainImage, setMainImage] = useState(null)
  const changeFeaturedImage = (e) => {
    const file = e.target.files[0]; // get image
    if (file) {
      const imageUrl = URL.createObjectURL(file); // create temp URL
      setFeaturedImage(imageUrl); // update URL
      setMainImage(file)
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
  };

  // extra images
  const [extraImages, setExtraImages] = useState([]);
  const [featuredImages, setFeaturedImages] = useState([])
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
    setFeaturedImages(files)
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

  const deleteExtraImage = (url) => () => {
    // change currentSelectedImage to null
    // delete from extraImagesDescription
    // remove from array
    currentSelectedImage.current = null;
    delete extraImagesDescription.url;
    setExtraImages((cur) => cur.filter((u) => u !== url));
  };

  const handleCategoryChange = async (categoryName = '') => {
    console.log(categoryName)
    const response = await axiosInstance.get(`/brand/${categoryName}`)
    setBrands(response.data)
  }

  const getSuppliers = useCallback(async () => {
    const response = await axiosInstance.get('/supplier')
    setSuppliers(response.data)
  }, [])

  const getCategoryList = useCallback(async () => {
    const response = await axiosInstance.get('/category')
    setCategoryList(response.data)
  }, [])


  useEffect(() => {
    getSuppliers()
    getCategoryList()
  }, [getSuppliers, getCategoryList])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('images', mainImage)
    if (featuredImages.length > 0){
      for (const img of featuredImages){
        data.append('images', img)
      }
    }

    data.append('productName', productName)
    data.append('purchasePrice', purchasePrice)
    data.append('sellingPrice', sellingPrice)
    data.append('supplierId', supplier)
    data.append('categoryId', category)
    data.append('description', description)
    data.append('brand', brand)

    const response = await axios({
            method: 'POST',
          url: 'http://localhost:3000/api/product',
            data,
            headers: {'Content-Type': 'multipart/form-data'}
        })
    if(response.status) {
      navigate("/admin/products")
    }
  }

  return (
    <div className="text-sm bg-customGray3">
      <div className="text-base grid lg:grid-cols-[repeat(3,_1fr)] items-center p-6 bg-white shadow-md rounded-[20px]">
        <Link className='flex items-center' to="..">
          <button className="w-[200px] mr-auto text-gray-600 text-lg">&#8592; Product {productId}</button>
        </Link>
        <p className="text-base font-semibold justify-self-center">
          ADD PRODUCT
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-[1fr_1fr] gap-4">
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
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />
            <h5 className='mt-5 font-normal text-slate-400 mb-2'>Description</h5>
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
              <h3 className="text-base font-semibold">Pricing</h3>
            </div>
            <div className="flex gap-4 mt-3">
                  <div className="flex-grow">
                    <h5 className='font-normal text-slate-400 mb-2'>Purchase Price</h5>
                    <Input
                      slotProps={{
                        input: {
                          className:
                            "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                        },
                      }}
                      value={purchasePrice}
                      onChange={e => setPurchasePrice(e.target.value)}
                    />
                  </div>
                  <div className="flex-grow">
                    <h5 className='font-normal text-slate-400 mb-2'>Selling Price</h5>
                    <Input
                      slotProps={{
                        input: {
                          className:
                            "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                        },
                      }}
                      value={sellingPrice}
                      onChange={e => setSellingPrice(e.target.value)}
                    />
                  </div>
                </div>
          </fieldset>
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Supplier</h3>
            <div className="flex-grow space-y-2">
              <select
                onChange={e => setSupplier(e.target.value)}
                className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                id="product-category">
                  <option>Select supplier</option>
                {suppliers.map((supplier, index) => {
                  return (
                    <option key={index} value={supplier.id} >{supplier.supplierName}</option>
                  )
                })}
              </select>
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
              </>
            )}
          </fieldset>
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Category</h3>
            <div className="flex gap-4">
              <div className="flex-grow space-y-2">
                <h5 className='font-normal text-slate-400 mb-2'>Product Category</h5>
                <select
                  onChange={e => {setCategory(e.target.value); handleCategoryChange(e.target.value)}}
                  className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                  id="product-category"
                  >
                    <option value= "" >Select category</option>
                  {categoryList.map((item, index) => {
                    return (
                      <option key={index} value={item.id} >{item.categoryName}</option>
                    )
                  })}
                </select>
              </div>
              <div className="flex-grow space-y-2">
              <h5 className='font-normal text-slate-400 mb-2'>Brand</h5>
                <select
                onChange={e => setBrand(e.target.value)}
                  className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                  id="product-brand">
                    <option value="">Select brand</option>
                  {brands.map((item, index) => {
                    return (
                      <option key={index} value={item.brandName}>{item.brandName}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </fieldset>

          {/* <Link to='/admin/products' className="w-max self-end bg-black text-white text-base px-8 py-3 rounded-lg shadow-md">
          <button
            type="submit">
            <span>Submit</span>
          </button></Link> */}
          <button
            className="w-max self-end bg-black text-white text-base px-8 py-3 rounded-lg shadow-md"
            type="submit">
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
