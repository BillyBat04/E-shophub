/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import formatNumber from "../helpers/formatNumber"

const SimilarProduct = ({SKU, sellingPrice, image}) => {
    return (
        <Link 
  to={`/detail-product/${SKU}`} 
  className="group p-4 mx-2 my-2 bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
>
  <div className="">
    <img 
      className="w-[150px] h-[150px] rounded-md group-hover:opacity-90 transition-opacity duration-300" 
      src={image} 
      alt="Product"
    />
  </div>
  <p className="text-[18px] font-bold mt-3 text-gray-800 group-hover:text-gray-600">
    {formatNumber(sellingPrice)}đ
  </p>
</Link>

    )
}

export default SimilarProduct