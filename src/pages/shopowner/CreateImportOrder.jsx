import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../../config/api";
import { RxCross2 } from "react-icons/rx";
const CreateImportOrder = () => {
  const { productId } = useParams();
  const navigate = useNavigate()

   const [suppliers, setSuppliers] = useState([])
   const [activeSupplierId, setActiveSupplierId] = useState('')
    const [products, setProducts] = useState([])
    const [productList, setProductList] = useState([])
    const [productSelected, setProductSelected] = useState([])
  const [productOptions, setproductOptions] = useState([{ id: 0 }]);
  const productOptionCount = useRef(1);
    const [address, setAddress] = useState('')
  const [quantities, setQuantities] = useState(
        productOptions.reduce((acc, option) => {
            acc[option.id] = 0;
            return acc;
        }, {})
    );

    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)


  const addproductOption = () => {
    setproductOptions((prevOptions) => [
        ...prevOptions,
        { id: productOptionCount.current },
    ]);
    productOptionCount.current += 1;
};
    const removeproductOption = (id) => () => {
        setproductOptions((options) => options.filter((option) => option.id !== id));
    };

  const getSuppliers = useCallback(async () => {
    const response = await axiosInstance.get('/supplier')
    setSuppliers(response.data)
  }, [])


  useEffect(() => {
    getSuppliers()
  }, [getSuppliers])

  const handleSupplierChanged  = async (e) => {
    const response = await axiosInstance.get(`/product/get-product/${e.target.value}`)
    setProducts(response.data)
    setActiveSupplierId(e.target.value)
  }

  const handleProductChanged = async (productSKU) => {
    setProductSelected(prevState => [...prevState, productSKU])
  }

  const handleQuantityChange = (optionId, value) => {
        console.log(optionId)
        setQuantities(prevState => ({
            ...prevState,
            [optionId]: value, // Cập nhật quantity của option tương ứng
        }));
    };

  const handleConfirm = async () => {
    const temp = []
    let quantity = 0
    let price = 0
    for (let i = 0; i < productSelected.length; i++) {
        const response = await axiosInstance.get(`/product/${productSelected[i]}`)
        temp.push(response.data)
        setProductList(prevState => [...prevState, response.data])
        quantity += parseInt(quantities[i])
        price += response.data.purchasePrice * quantities[i]
    }
    setTotalQuantity(quantity)
    setTotalPrice(price)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      orderDate: new Date(),
      status: "PROCESSING",
      totalPrice: totalPrice,
      shippingAddress: address,
      supplierId: activeSupplierId
    }

    try {
      const response = await axiosInstance.post('/supply-order', data)
      const newSupplyOrder = response.data 

      for (let i = 0; i < productSelected.length; i++){
        const data = {
          totalPrice: productList[i].purchasePrice * parseInt(quantities[i]),
          productSKU: productSelected[i],
          supplyOrderId: newSupplyOrder.id,
          quantity: parseInt(quantities[i])
        }
        await axiosInstance.post('/supply-order-detail', data)
      }
      navigate('/admin/orders')
      window.location.reload()
    } catch (error) {
      console.log(error)
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
                <h3 className="text-base mb-3 font-semibold">Supplier</h3>
                <div className="flex-grow space-y-2">
                <select
                    onChange={e => handleSupplierChanged(e)}
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
          <fieldset className="px-8 py-6 bg-white shadow-md rounded-xl">
            <h3 className="text-base font-semibold mb-3">General Infomation</h3>
            <div className=''>
                    <div className='p-5 w-full h-[90%] bg-white rounded-lg customShadow'>
                    <h3 className="text-base mb-3 font-semibold">Shipping Address</h3>
                    <input
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                    />
                    <h3 className="text-base my-3 font-semibold">Products</h3>
                        <button
                            className="border border-blue-700 px-3 py-1 rounded-md text-blue-700"
                            type="button"
                            onClick={addproductOption}>
                            Add Product
                        </button>
                        <div className=''>
                            {productOptions.map((option, index) => {
                                return (
                                    <div key={option.id} className="flex gap-4 mt-3">
                                        <div className="flex-grow w-1/2">
                                            <h5 className='font-normal text-slate-400 mb-2' htmlFor={`sku-${option.id}`}>Product</h5>
                                            <select 
                                                onChange={(e) => handleProductChanged(e.target.value)}
                                                className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                                                id="product-category">
                                                <option>Select product</option>
                                                {products.map((product, index) => {
                                                return (
                                                    <option key={index} value={product.SKU} >{product.productName}</option>
                                                )
                                                })}
                                            </select>
                                        </div>
                                        <div className="flex-grow w-1/2">
                                            <h5 className='font-normal text-slate-400 mb-2' htmlFor={`quantity-${option.id}`}>Quantity</h5>
                                            <input
                                                className="w-full bg-slate-200 p-2 border border-black rounded-lg"
                                                value={quantities[index] || ''}
                                                onChange={e => handleQuantityChange(index, e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="w-7 h-7 p-1 self-center mt-4"
                                            onClick={removeproductOption(option.id)}>
                                            <RxCross2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={e => handleConfirm(e)}
                                className="opacity-50 hover:opacity-100 duration-150 mt-4 ml-[auto] self-end bg-black text-white text-base px-8 py-3 rounded-lg shadow-md"
                                type="button">
                                <span>Confirm</span>
                            </button>
                        </div>
                    </div>
                </div>
          </fieldset>
        </div>
        <div className="flex flex-col gap-4">
            <div className="px-8 py-6 bg-white shadow-md rounded-xl">
                <h3 className="text-base font-semibold mb-3">Products</h3>
                {productList?.map((product, index) => {
                        return (
                            <div key={index} className="flex items-center p-2 rounded-md border border-black mt-4">
                                <div className="w-[80px] h-[80px]">
                                  <img src={product.image} className="w-full h-full"/>
                                </div>
                                <div className="ml-6 w-2/3">
                                    <p className="">Product Name: <span className="font-[18px] font-bold">{product.productName}</span></p>
                                    <p>Quantity: {quantities[index]}</p>
                                </div>
                            </div>
                        )
                    })}
                  <h3 className="text-base font-semibold mt-3">Address: {address}</h3>
                  <h3 className="text-base font-semibold mt-3">Total Quantity: {totalQuantity}</h3>
                  <h3 className="text-base font-semibold mt-3">Total Price: {totalPrice}</h3>
            </div>
          <button
            onClick={e => handleSubmit(e)}
            className="w-max self-end bg-black text-white text-base px-8 py-3 rounded-lg shadow-md"
            type="button">
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateImportOrder;
