import { IoAdd } from "react-icons/io5";
import productListData from "../../SampleData/productList.json";
import { IoIosSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Card, Typography } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";
import Switcher from "../../components/togglebutton";

const ProductList = () => {
  const isDetailPage = location.pathname !== "/admin/products";
  const TABLE_HEAD = ["SKU", "Name", "Image","Selling", "Status", "Price", "Inventory", "Rating"];
  
  if (isDetailPage) {
    return <Outlet></Outlet>
  }

  return (
    <div className="h-full p-6 bg-white shadow-md rounded-[20px] text-sm">
      <div className="flex justify-between">
        <form className="flex gap-4">
          <div className="grid grid-cols-[1fr_auto] px-4 py-2 border border-black rounded-[20px]">
            <input
              className="focus:outline-none"
              placeholder="Find ID or name"></input>
            <button type="submit">
              <IoIosSearch className="w-6 h-6"></IoIosSearch>
            </button>
          </div>
          <button>
            <FaFilter className="w-6 h-6"></FaFilter>
          </button>
        </form>
        <button className="flex items-center gap-2 bg-black rounded-[20px] px-4 py-2">
          <span className="text-white font-bold">Add Product</span>
          <IoAdd className="w-6 h-6 text-white"></IoAdd>
        </button>
      </div>

      <div className="mt-4 h-[92%] overflow-y-scroll">
        <Card className="p-5 w-full flex h-full overflow-scroll px-6">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr >
                {TABLE_HEAD.map((head, index) => (
                  <th key={head} className={`border-r-[4px] border-white bg-customGray3 pb-4 pt-4 
                    ${index === 0 ? 'rounded-l-2xl' : ''} 
                    ${index === TABLE_HEAD.length - 1 ? 'rounded-r-2xl' : ''}`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productListData.map((row, index) => {
                const isLast = index === productListData.length - 1;
                const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                return (
                  <tr key={row.sku} className="hover:bg-gray-50">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {row.sku}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        <img src={row.image} alt="Ảnh sản phẩm" />
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.sold}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        <Switcher status= {row.selling}/>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.stock}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.rating}
                      </Typography>
                    </td>
                    
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-white"
                      >
                        <Link to={row.sku}>
                          <button className='bg-black w-20 h-6 rounded-xl'>
                            Detail
                          </button>
                        </Link>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default ProductList;
