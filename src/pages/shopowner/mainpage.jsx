import Nav from "../../components/shopowner/nav/nav";
import Header from "../../components/shopowner/header";
import { Outlet, useLocation } from "react-router-dom";
import { IoIosChatbubbles, IoMdPeople } from "react-icons/io";
import { FaBox, FaReceipt } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { MdTrolley } from "react-icons/md";
const MainPage = () => {

  const item = [
    { label: "Chat", icon: IoIosChatbubbles, link: "chat" },
    { label: "Order", icon: FaReceipt, link: "orders" },
    { label: "Product", icon: FaBox, link: "products" },
    { label: "Employee", icon: IoMdPeople, link: "employees" },
    { label: "Supplier", icon: MdTrolley, link: "supplier" },
    { label: "Report", icon: BiSolidReport, link: "reports" },
  ];

  return (
    <div
      className="h-full w-full grid grid-rows-10 p-5 bg-customGray3">
      <div className="row-span-1 flex justify-center pb-5">
        <Header />
      </div>
      <div className="row-span-9 w-full h-full grid grid-cols-5 gap-4">
        <div className="col-span-1 bg-white shadow-md rounded-[20px] text-sm flex flex-col justify-between">
          <div className="mt-5 flex justify-center">
            <Nav items={item} />
          </div>
          <button className="flex pb-5 justify-center">
            <span className="font-bold">Log out</span>
            <img src="/src/assets/logout.png" className="ml-2 w-6 h-6" />
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
