import React, {useState} from 'react';
import Nav from '../../components/shopowner/nav/nav';
import Header from '../../components/shopowner/header';
import CustomBarChart from '../../custom/customBarchart';
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const Reports = () => {
  const TABLE_HEAD = ["No", "SKU", "Image", "Name", "Price", "Sold", "Inventory", "Rating"];

  const tableRows = [
    {
      no: "1",
      sku: "0312873",
      img: "src/assets/16pr.svg",
      name: "iPhone 16 Pro",
      price: "20.000.000 VND",
      sold: "1000",
      inventory: "1000",
      rating: "5",
    },
    {
      no: "1",
      sku: "0312873",
      img: "src/assets/16pr.svg",
      name: "iPhone 16 Pro",
      price: "20.000.000 VND",
      sold: "1000",
      inventory: "1000",
      rating: "5",
    },
    {
      no: "1",
      sku: "0312873",
      img: "src/assets/16pr.svg",
      name: "iPhone 16 Pro",
      price: "20.000.000 VND",
      sold: "1000",
      inventory: "1000",
      rating: "5",
    },
    {
      no: "1",
      sku: "0312873",
      img: "src/assets/16pr.svg",
      name: "iPhone 16 Pro",
      price: "20.000.000 VND",
      sold: "1000",
      inventory: "1000",
      rating: "5",
    },
    {
      no: "1",
      sku: "0312873",
      img: "src/assets/16pr.svg",
      name: "iPhone 16 Pro",
      price: "20.000.000 VND",
      sold: "1000",
      inventory: "1000",
      rating: "5",
    },
    {
      no: "1",
      sku: "0312873",
      img: "src/assets/16pr.svg",
      name: "iPhone 16 Pro",
      price: "20.000.000 VND",
      sold: "1000",
      inventory: "1000",
      rating: "5",
    },

  ];
  const data = [
    { name: "11/11", value: 17 },
    { name: "12/11", value: 45 },
    { name: "13/11", value: 155 },
    { name: "14/11", value: 220 },
    { name: "15/11", value: 105 },
    { name: "16/11", value: 10 },
  ];
  const item = [
    { label: 'Chat', icon: "src/assets/chat.svg", link: "/chat" },
    { label: 'Order', icon: "src/assets/order.svg", link: "/orders" },
    { label: 'Product', icon: "src/assets/product.svg", link: "/products" },
    { label: 'Employee', icon: "src/assets/employee.svg", link: "/employees" },
    { label: 'Report', icon: "src/assets/report.svg", active: true, link: "/reports" },
  ]

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
        <div className='w-4/5  h-full ml-5 grid grid-rows-2'>
          <div className='grid grid-cols-5'>
            <div className='col-span-2 mb-3 mr-5 space-y-2 '>
              <div className='flex justify-start items-center w-full h-[31.6%] bg-black customShadow rounded-lg'>
                <div className='w-[80%] h-[65%] flex justify-center items-center font-semibold text-white'>
                  <div className='mr-[30px] w-[60px] h-[60px] bg-white rounded-full flex justify-center items-center'>
                    <img src='src/assets/revenue.png' />
                  </div>
                  <div className='flex h-full flex-col justify-between'>
                    <span className='text-lg'>Revenue</span>
                    <span className='text-4xl'>1000$</span>
                  </div>
                </div>
              </div>
              <div className='flex justify-start items-center w-full h-[31.6%] bg-black customShadow rounded-lg'>
                <div className='w-[80%] h-[65%]  flex justify-center items-center font-semibold text-white'>
                  <div className=' mr-[30px] w-[60px] h-[60px] bg-white rounded-full flex justify-center items-center'>
                    <img src='src/assets/order.png' />
                  </div>
                  <div className='mr-[20px] flex h-full flex-col justify-between'>
                    <span className='text-lg'>Order</span>
                    <span className='text-4xl'>1000</span>
                  </div>
                </div>
              </div>
              <div className='flex justify-start items-center w-full h-[31.6%] bg-black customShadow rounded-lg'>
                <div className='w-[80%] h-[65%] flex justify-center items-center font-semibold text-white'>
                  <div className='mr-[30px] w-[60px] h-[60px] bg-white rounded-full flex justify-center items-center'>
                    <img src='src/assets/profit.png' />
                  </div>
                  <div className='flex h-full flex-col justify-between'>
                    <span className='text-lg'>Profit</span>
                    <span className='text-4xl'>1000$</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='p-5 col-span-3 flex flex-col justify-center items-center rounded-lg mb-3 bg-white customShadow'>
              <span className=' font-semibold text-2xl'>Revenue Chart</span>
              <CustomBarChart data={data} />
            </div>
          </div>
          <div className='rounded-lg bg-white customShadow'>
            <Card className="p-5 w-full flex h-full bg-white overflow-scroll px-6">
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
                            {row.sku}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            <img className='w-10 h-10' src= {row.img}/>
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
                            {row.price}
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
                            {row.inventory}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal  flex flex-row justify-center items-center text-gray-600"
                          >
                            {row.rating}
                            <img className='flex ml-1 h-4 w-4' src="src/assets/stars.png"/>

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
      </div>
    </div>
  )
}

export default Reports;
