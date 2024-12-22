import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../config/api";
import { Input } from "@mui/base";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateDisplayedProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate()
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const getCategoryList = useCallback(async () => {
        const response = await axiosInstance.get('/category')
        setCategoryList(response.data)
    }, [])


    const handleChangeCategory = async (e) => {
        const categoryId = e.target.value
        const response = await axiosInstance.get(`/brand/${categoryId}`)
        setBrandList(response.data)
    }

    const handleChangeBrand = async (e) => {
        const brandName = e.target.value 
        const response = await axiosInstance.get(`/product/filter-product/${brandName}`)
        setProductList(response.data)
    }
    const handleChangeProduct = async (e) => {
        const productSKU = e.target.value 
        const response = await axiosInstance.get(`/product/${productSKU}`)
        setProduct(response.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            quantity: parseInt(quantity),
            productId: product.SKU,
            sellingPrice: product.sellingPrice
        }

        const response = await axiosInstance.post('/displayed-product', data)

        if (response.data) {
            toast.success("Thêm vào giỏ hàng thành công!", {
                autoClose: 3000, 
                hideProgressBar: true,
              });
            navigate('/admin/displayed-product')
            window.location.reload()
        } 
        toast.error("Đã xảy ra lỗi trong quá trình xác nhận", {
            autoClose: 3000, 
            hideProgressBar: true,
          });
    }

    useEffect(() => {
        getCategoryList()
    }, [getCategoryList])

  return (
    <div className="text-sm bg-customGray3">
        <ToastContainer position="top-right"/>
      <div className="text-base grid lg:grid-cols-[repeat(3,_1fr)] items-center p-6 bg-white shadow-md rounded-[20px]">
        <Link className='flex items-center' to="..">
          <button className="w-[200px] mr-auto text-gray-600 text-lg">&#8592; Product {productId}</button>
        </Link>
        <p className="text-base font-semibold justify-self-center">
          ADD DISPLAYED PRODUCT
        </p>
      </div>
      <div className="">
      <form className="flex justify-between">
        <div className="flex flex-col w-1/2 m-4">
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base mb-3 font-semibold">Chọn danh mục sản phẩm</h3>
            <div className="flex-grow space-y-2">
              <select
                onChange={e => handleChangeCategory(e)}
                className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                id="product-category">
                  <option>Select Supplier</option>
                {categoryList.map((item, index) => {
                  return (
                    <option key={index} value={item.id} >{item.categoryName}</option>
                  )
                })}
              </select>
            </div>
            <h3 className="text-base mb-3 font-semibold mt-4">Chọn thương hiệu sản phẩm</h3>
            <div className="flex-grow space-y-2 mt-4">
              <select
                onChange={e => handleChangeBrand(e)}
                className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                id="product-category">
                  <option>Select Brand</option>
                {brandList.map((item, index) => {
                  return (
                    <option key={index} value={item.brandName} >{item.brandName}</option>
                  )
                })}
              </select>
            </div>
            <h3 className="text-base mb-3 font-semibold mt-4">Chọn sản phẩm</h3>
            <div className="flex-grow space-y-2 mt-4">
              <select
                onChange={e => handleChangeProduct(e)}
                className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                id="product-category">
                  <option>Select supplier</option>
                {productList.map((item, index) => {
                  return (
                    <option key={index} value={item.SKU} >{item.productName}</option>
                  )
                })}
              </select>
            </div>
          </fieldset>
        </div>
        <div className="bg-white rounded-xl px-8 py-6 w-1/2 m-4">
            <h3 className="text-base mb-3 font-semibold">Chi tiết sản phẩm</h3>
            {product && <div>
                <div className="flex flex-col items-center">
                    <img src={product?.image} className="w-[150px] h-[150px]" />
                    <p className="w-1/2 text-center font-bold">{product?.productName || ''}</p>
                    <p>Số lượng tồn kho: {product?.quantity}</p>
                </div>
                <Input
                    slotProps={{
                    input: {
                        className:
                        "pl-2 font-normal rounded-md mt-4 bg-slate-50 border border-slate-500 w-full h-10 text-black",
                    },
                    }}
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    placeholder="Nhập số lượng..."
                />
            <div className="flex flex-col gap-4">
            <button
                onClick={(e) => handleSubmit(e)}
                className="mt-4 w-max self-end bg-black text-white text-base px-8 py-3 rounded-lg shadow-md"
                type="submit">
                <span>Submit</span>
            </button>
            </div>
            </div>}
        </div>
      </form>
      </div>
    </div>
  );
};

export default CreateDisplayedProduct;
