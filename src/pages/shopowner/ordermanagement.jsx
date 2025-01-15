import { useState } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link, Outlet } from "react-router-dom";
const OrderManagement = () => {
  const TABLE_HEAD = ["No", "Customer", "Date", "Amount", "Items", "Payment", "Status"];
  const [tableRows, setTableRows] = useState([
    {
      no: "23121",
      customer: "Minhgaa",
      date: "21:21. 7 Nov",
      amount: "20.000.000",
      item: "1",
      mode: "COD",
      status: "Pending",
    },
    {
      no: "23122",
      customer: "Minhgaa",
      date: "21:21. 7 Nov",
      amount: "20.000.000",
      item: "1",
      mode: "COD",
      status: "Canceled",
    },
    {
      no: "23123",
      customer: "Minhgaa",
      date: "21:21. 7 Nov",
      amount: "20.000.000",
      item: "1",
      mode: "COD",
      status: "Pending",
    },

  ]);

  const handleStatusChange = (index, newStatus) => {
    setTableRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, status: newStatus } : row
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500 bg-yellow-300";
      case "Canceled":
        return "text-red-500 bg-red-300";
      case "Shipped":
        return "text-green-500 bg-green-300";
      case "Delivered":
        return "text-blue-500 bg-blue-300";
      default:
        return "text-gray-600 bg-gray-400";
    }
  };
  const isDetailPage = location.pathname !== "/admin/orders";

  if (isDetailPage) {
    return <Outlet></Outlet>
  }
  return (
    <div className='w-full h-full flex'>
      <div className='w-full h-fullflex flex-col'>
        <div className='mb-5 max-h-[140px] w-full flex h-1/5 space-x-5'>
          <div className='w-[25%] p-6 h-full font-semibold text-white bg-black shadow-md rounded-[20px]'>
            <div className='w-full h-[100%] flex flex-row items-center justify-between'>
              <div className='flex flex-col h-full justify-between'>
                <label className='text-base '>
                  Tổng số đơn hàng
                </label>
                <span className='text-5xl'>100</span>
              </div>
              <div className='h-[70px] w-[70px] rounded-full flex justify-center items-center bg-white'>
                <img src="/src/assets/total.png" />
              </div>
            </div>
          </div>
          <div className='w-[25%] p-6 h-full font-semibold text-black bg-white shadow-customShadow rounded-[20px]'>
            <div className='w-full h-[100%] flex flex-row items-center justify-between'>
              <div className='flex flex-col h-full justify-between'>
                <label className='text-base '>
                  Đơn hàng đang chờ xử lý
                </label>
                <span className='text-5xl'>100</span>
              </div>
              <div className='h-[70px] w-[70px] rounded-full flex justify-center items-center border border-black bg-white'>
                <img src="/src/assets/pending.png" />
              </div>
            </div>
          </div>
          <div className='w-[25%] p-6 h-full font-semibold  text-black bg-white shadow-md rounded-[20px]'>
            <div className='w-full h-[100%] flex flex-row items-center justify-between'>
              <div className='flex flex-col h-full justify-between'>
                <label className='text-base '>
                  Đơn hàng xử lý thành công
                </label>
                <span className='text-5xl'>100</span>
              </div>
              <div className='h-[70px] w-[70px] rounded-full flex justify-center items-center bg-white border border-black'>
                <img src="/src/assets/success.png" />
              </div>
            </div>
          </div>

        </div>
        <Card className="p-5 w-full flex h-4/5 bg-white shadow-md rounded-[20px] overflow-scroll px-6">
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
              {tableRows.map((row, index) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                return (
                  <tr key={row.no} className="hover:bg-gray-50">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {row.no}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.customer}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.amount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.item}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.mode}
                      </Typography>
                    </td>
                    <td className={`${classes} flex justify-center items-center`}>
                      <Typography className={`font-normal w-20 flex items-center justify-center rounded-full ${getStatusColor(row.status)}`}>
                        {row.status}
                      </Typography>
                      <Menu as="div" className="relative inline-block text-left ml-2">
                        <MenuButton>
                          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                        </MenuButton>
                        <MenuItems className="flex flex-col items-start absolute right-0 z-10  w-56 bg-white rounded-lg shadow-lg">
                          {["Pending", "Shipped", "Delivered", "Canceled"].map((status) => (
                            <MenuItem key={status} as="button" onClick={() => handleStatusChange(index, status)}>
                              <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{status}</span>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Menu>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-white"
                      >
                        <Link to={row.no}>
                          <button className='bg-black w-20 h-6 rounded-xl'>
                            Chi tiết
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
  )
}

export default OrderManagement;
