
import { IoIosSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Card, Typography } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../config/api";
import formatDate from "../../helpers/formatDate";

const CustomerList = () => {
  const isDetailPage = location.pathname !== "/admin/customers";
  const TABLE_HEAD = ["No", "Email", "Họ Tên", "Giới tính" ,"Số điện thoại", "Ngày sinh", "Địa chỉ"];
  const [CustomerList, setCustomerList] = useState([])

  const getList = useCallback(async () => {
    const response = await axiosInstance.get('/customer')
    setCustomerList(response.data)
  }, [])

  useEffect(() => {
    getList()
  }, [getList])

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
              placeholder="Find username, phone number"></input>
            <button type="submit">
              <IoIosSearch className="w-6 h-6"></IoIosSearch>
            </button>
          </div>
          <button>
            <FaFilter className="w-6 h-6"></FaFilter>
          </button>
        </form>
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
              {CustomerList.length > 0 && CustomerList.map((row, index) => {
                const isLast = index === CustomerList.length - 1;
                const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                return (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.user.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.fullName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.gender}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.phoneNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.birthday}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.address}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-white"
                      >
                        <Link to={row.id}>
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

export default CustomerList;
