import React, { useState } from 'react';
import Nav from '../../components/shopowner/nav/nav';
import Header from '../../components/shopowner/header';
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const OrderManagement = () => {
  const [isDetailVisible, setDetailVisible] = useState(false);
  const toggleDetail = () => setDetailVisible(!isDetailVisible);
  const item = [
    { label: 'Chat', icon: "src/assets/chat.svg", link: "/chat" },
    { label: 'Order', icon: "src/assets/order.svg", active: true, link: "/orders" },
    { label: 'Product', icon: "src/assets/product.svg", link: "/products" },
    { label: 'Employee', icon: "src/assets/employee.svg", link: "/employees" },
    { label: 'Report', icon: "src/assets/report.svg", link: "/reports" },
  ]
  const TABLE_HEAD = ["No", "Customer", "Date", "Amount", "Items", "Payment", "Status"];

  const [tableRows, setTableRows] = useState([
    {
      no: "23123",
      customer: "Minhgaa",
      date: "21:21. 7 Nov",
      amount: "20.000.000",
      item: "1",
      mode: "COD",
      status: "Pending",
    },
    {
      no: "23123",
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

  return (
    <div className="pb-5 pr-5 pl-5 pt-2 w-full h-full bg-customGray3 flex flex-col justify-center items-center">
      <div className='w-[60%] h-[8%] flex justify-center'>
        <Header />
      </div>
      <div className='w-full h-[90%] flex'>
        <div className='w-1/5 h-full p-3 bg-white shadow-md rounded-[20px] text-sm justify-between flex flex-col'>
          <Nav items={item} />
          <button className='pb-3 flex justify-end items-center mr-5'>
            <span className='text-md'>Log out</span>
            <img src='src/assets/logout.png' className='ml-3 w-6 h-6' />
          </button>
        </div>

        {!isDetailVisible ? (
          <div className='w-4/5 h-full ml-5 flex flex-col'>
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
                    <img src="src/assets/total.png" />
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
                    <img src="src/assets/pending.png" />
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
                    <img src="src/assets/success.png" />
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
                            <button onClick={toggleDetail} className='bg-black w-20 h-6 rounded-xl'>Detail</button>
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>)
          : (
            <div className='w-4/5 h-full ml-5 flex flex-col'>
              <div className="flex items-center p-4 bg-white rounded-[10px] shadow-md mb-4">
                <button onClick={toggleDetail} className="absolute mr-auto text-gray-600 text-lg">&#8592; Order 23123</button>
                <div className='w-full h-full flex justify-center'>
                  <h2 className=" font-semibold text-lg">ORDER DETAIL</h2>
                </div>
              </div>

              <div className="grid grid-cols-3 w-full h-full gap-4">
                <div className="col-span-2 p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-medium text-xl mb-4">Order Detail</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="mb-10 font-bold text-left">
                        <th> </th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(3)].map((_, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="flex items-center space-x-2 py-2">
                            <img src="src/assets/16pr.svg" alt="Product" className="w-12 h-12 rounded" />
                            <span>Iphone 16 Pro - 256GB</span>
                          </td>
                          <td className="text-center">1</td>
                          <td className="text-center">20.000.000</td>
                          <td className="text-center">20.000.000</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-medium text-xl mb-4">Customer Information</h3>
                  <div className='xl:space-y-2'>
                    <div className='w-full flex justify-between'>
                      <span className='font-bold'>Name: </span>
                      <span className=''>Le Bao Minh </span>
                    </div>
                    <div className='w-full flex justify-between'>
                      <span className='font-bold'>Phone number: </span>
                      <span className=''>0832873782 </span>
                    </div>
                    <div className='w-full flex flex-col'>
                      <span className='font-bold'>Note: </span>
                      <span className=''>083287jsksjkmlxwkmkxmw3782 </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 h-full p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-medium text-xl mb-4">Delivery Information</h3>
                  <div className='xl:space-y-2'>
                    <div className='w-full flex justify-between'>
                      <span className='font-bold'>Phone number: </span>
                      <span className=''>0812352371 </span>
                    </div>
                    <div className='w-full flex justify-between'>
                      <span className='font-bold'>Address: </span>
                      <span className=''>Binh Chieu, Thu Duc, Ho Chi Minh city </span>
                    </div>
                    <div className='w-full flex justify-end'>
                      <span className="inline-block bg-yellow-200 text-yellow-700 px-3 py-1 rounded-full mt-2">In transit</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-medium text-xl mb-4">Order Summary</h3>
                  <div className='xl:space-y-2'>
                    <div className='w-full flex justify-between'>
                      <span className='font-bold'>Order created: </span>
                      <span className=''>Thu 7 Nov </span>
                    </div>
                    <div className='w-full flex justify-between'>
                      <span className='font-bold'>Order time: </span>
                      <span className=''>21:21 </span>
                    </div>
                    <div className='w-full flex justify-between'>
                      <span className='font-bold'>Item quantity: </span>
                      <span className=''>1 </span>
                    </div>
                    <div className='w-full flex justify-between'>
                      <span className='font-bold'>Sub total: </span>
                      <span className=''>20.000.000 VND </span>
                    </div>
                    <div className='w-full flex justify-between'>
                      <span className='font-bold'>Delivery fee: </span>
                      <span className=''>0 VND</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
      </div>
    </div >
  )
}

export default OrderManagement;
