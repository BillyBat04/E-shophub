import { useCallback, useEffect, useState } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link, Outlet } from "react-router-dom";
import { IoAdd } from 'react-icons/io5';
import axiosInstance from '../../config/api';
import formatDate from '../../helpers/formatDate';
const ImportOrder = () => {
  const TABLE_HEAD = ["No", "Order Date", "Shipping Address", "Total Price", "Supplier", "Status"];
  const [supplyOrders, setSupplyOrders] = useState([])

  const getList = useCallback(async () => {
    const response = await axiosInstance.get('/supply-order')
    setSupplyOrders(response.data)
  }, [])

  useEffect(() => {
    getList()
  }, [getList])

  const [tableRows, setTableRows] = useState([
    {
      no: "23121",
      customer: "Minhgaa",
      date: "21:21. 7 Nov",
      amount: "20.000.000",
      item: "1",
      mode: "COD",
      status: "PROCESSING",
    },
    {
      no: "23122",
      customer: "Minhgaa",
      date: "21:21. 7 Nov",
      amount: "20.000.000",
      item: "1",
      mode: "COD",
      status: "SHIPPING",
    },
    {
      no: "23123",
      customer: "Minhgaa",
      date: "21:21. 7 Nov",
      amount: "20.000.000",
      item: "1",
      mode: "COD",
      status: "CANCELED",
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
      case "PROCESSING":
        return "text-yellow-700 bg-yellow-300";
      case "CANCELED":
        return "text-red-500 bg-red-300";
      case "COMPLETED":
        return "text-green-500 bg-green-300";
      case "SHIPPING":
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
                  Total orders
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
                  Pending orders
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
                  Successful ords
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
          <Link className=" bg-black rounded-[20px] px-6 py-2 w-[200px] ml-auto text-center" to="/admin/orders/create"> 
              <button className="flex items-center">
                <span className="text-white font-bold">Create order</span>
                <IoAdd className="w-6 h-6 text-white"></IoAdd>
              </button>
            </Link>
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
              {supplyOrders.map((row, index) => {
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
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {formatDate(row.orderDate)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.shippingAddress}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.totalPrice}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.supplierId.slice(0,3)}
                      </Typography>
                    </td>
                    <td className={`${classes} flex justify-center items-center`}>
                      <Typography className={`font-normal w-full flex items-center justify-center rounded-full ${getStatusColor(row.status)}`}>
                        {row.status}
                      </Typography>
                      <Menu as="div" className="relative inline-block text-left ml-2">
                        <MenuButton>
                          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                        </MenuButton>
                        <MenuItems className="flex flex-col items-start absolute right-0 z-10  w-56 bg-white rounded-lg shadow-lg">
                          {["PROCESSING", "SHIPPING", "COMPLETED", "CANCELED"].map((status) => (
                            <MenuItem className= "w-full" key={status} as="button" onClick={() => handleStatusChange(index, status)}>
                              <span className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{status}</span>
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
  )
}

export default ImportOrder;
