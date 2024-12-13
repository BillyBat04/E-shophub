import React from "react";
import Nav from "../../components/shopowner/nav/nav";
import Header from "../../components/shopowner/header";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  const item = [
    { label: "Chat", icon: "src/assets/chat.svg", link: "chat" },
    { label: "Order", icon: "src/assets/order.svg", link: "orders" },
    { label: "Product", icon: "src/assets/product.svg", link: "products" },
    { label: "Employee", icon: "src/assets/employee.svg", link: "employees" },
    { label: "Supplier", icon: "src/assets/report.svg", link: "supplier" },
    { label: "Report", icon: "src/assets/report.svg", link: "reports" },
  ];

  return (
    <div
      className="h-full w-full grid grid-rows-10 p-5 bg-customGray3">
      <div className="row-span-1 flex justify-center pb-5">
        <Header />
      </div>
      <div className="row-span-9 w-full h-full grid grid-cols-5 gap-4">
        <div className="col-span-1 bg-white shadow-md rounded-[20px] text-sm flex flex-col justify-between">
          <Nav items={item} />
          <button className="flex pb-5 justify-center">
            <span className="font-bold">Log out</span>
            <img src="src/assets/logout.png" className="w-6 h-6" />
          </button>
        </div>
        <div className="col-span-4 overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
