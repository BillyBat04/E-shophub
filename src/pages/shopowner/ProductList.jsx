import { IoAdd } from "react-icons/io5";
import productListData from "../../SampleData/productList.json";
import { IoIosSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdCheckCircle, MdOutlineRadioButtonUnchecked } from "react-icons/md";

const ProductList = () => {
  return (
    <div className="h-full p-6 bg-white shadow-md rounded-[20px] text-sm">
      <div className="flex justify-between">
        <form className="flex gap-4">
          <div className="grid grid-cols-[1fr_auto] px-4 py-2 border border-black rounded-[20px]">
            <input
              className="focus:outline-none"
              placeholder="Tìm ID hoặc Tên"></input>
            <button type="submit">
              <IoIosSearch className="w-6 h-6"></IoIosSearch>
            </button>
          </div>
          <button>
            <FaFilter className="w-6 h-6"></FaFilter>
          </button>
        </form>
        <button className="flex items-center gap-2 bg-black rounded-[20px] px-4 py-2">
          <span className="text-white font-bold">Thêm sản phẩm</span>
          <IoAdd className="w-6 h-6 text-white"></IoAdd>
        </button>
      </div>

      <div className="mt-4 max-h-[640px] overflow-y-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <td className="product-th product-td-sku">SKU</td>
              <td className="product-th product-td-name">Tên sản phẩm</td>
              <td className="product-th product-td-img">Hình ảnh</td>
              <td className="product-th product-td-selling">Đang bán</td>
              <td className="product-th product-td-price">Giá bán</td>
              <td className="product-th product-td-stock">Kho</td>
              <td className="product-th product-td-rating">Đánh giá</td>
              <td className="product-th product-td-detail"> - </td>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {productListData.map((p) => (
              <tr className="hover:bg-gray-100" key={p.sku}>
                <td className="product-td-sku">{p.sku}</td>
                <td className="product-td-name">{p.name}</td>
                <td className="product-td-img">
                  <img src={p.image} alt="Ảnh sản phẩm" />
                </td>
                <td className="product-td-selling">
                  {p.selling ? (
                    <MdCheckCircle className="w-6 h-6 text-black ml-[20%]" />
                  ) : (
                    <MdOutlineRadioButtonUnchecked className="w-6 h-6 text-black  ml-[20%]" />
                  )}
                </td>
                <td className="product-td-price">{p.price}</td>
                <td className="product-td-stock">{p.stock}</td>
                <td className="product-td-rating">{p.rating}</td>
                <td className="product-td-detail">
                  <a>Chi tiết</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
