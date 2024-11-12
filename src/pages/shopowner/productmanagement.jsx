import React from 'react';
import Nav from '../../components/shopowner/nav/nav';
import Header from '../../components/shopowner/header';

const ProductManagement = () => {
  const item = [
    { label: 'Chat', icon: "src/assets/chat.svg", link: "/chat" },
    { label: 'Order', icon: "src/assets/order.svg", link: "/orders" },
    { label: 'Product', icon: "src/assets/product.svg", active: true, link: "/products" },
    { label: 'Employee', icon: "src/assets/employee.svg", link: "/employees" },
    { label: 'Report', icon: "src/assets/report.svg", link: "/reports" },
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
        <div className='w-4/5 flex h-full ml-5 bg-white shadow-md rounded-[20px]'>

        </div>
      </div>
    </div>
  )
}

export default ProductManagement;
