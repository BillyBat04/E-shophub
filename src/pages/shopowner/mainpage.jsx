import React from "react";
import Nav from "../../components/shopowner/nav/nav";
import Header from "../../components/shopowner/header";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  const item = [
    { label: "Chat", icon: "src/assets/chat.svg", link: "/chat" },
    { label: "Order", icon: "src/assets/order.svg", link: "/orders" },
    { label: "Product", icon: "src/assets/product.svg", link: "products" },
    { label: "Employee", icon: "src/assets/employee.svg", link: "employees" },
    { label: "Report", icon: "src/assets/report.svg", link: "/reports" },
  ];

  return (
    <div
      className="h-max min-h-[100vh] grid grid-rows-[auto_1fr] p-5 bg-customGray3">
      <div className="flex justify-center pb-5">
        <Header />
      </div>
      <div className="grid grid-cols-[1fr_4fr] gap-4">
        <div className="max-h-[700px] p-3 bg-white shadow-md rounded-[20px] text-sm flex flex-col justify-between">
          <Nav items={item} />
          <button className="flex gap-3 justify-center">
            <span className="font-bold">Log out</span>
            <img src="src/assets/logout.png" className="w-6 h-6" />
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
