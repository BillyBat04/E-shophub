import Nav from "../../components/shopowner/nav/nav";
import Header from "../../components/shopowner/header";
import { Outlet} from "react-router-dom";
import { IoIosChatbubbles, IoMdPeople } from "react-icons/io";
import { FaBox, FaReceipt, FaDisplay } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { MdCategory, MdInventory } from "react-icons/md";
import { MdTrolley, MdManageAccounts } from "react-icons/md";
import useUser from "../../hooks/useUser";
const MainPage = () => {
  const {user} = useUser()
  const item = [
    { label: "Order", icon: FaReceipt, link: "orders" },
    { label: "Customer's order", icon: FaReceipt, link: "customer-order" },
    { label: "Product", icon: FaBox, link: "products" },
    { label: "Category", icon: MdCategory, link: "category"},
    { label: "Displayed Product", icon: FaDisplay, link: "displayed-product" },
    { label: "Inventory", icon: MdInventory, link: "inventory" },
    { label: "Customer", icon: MdManageAccounts, link: "customers" },
    { label: "Employee", icon: IoMdPeople, link: "employees" },
    { label: "Supplier", icon: MdTrolley, link: "supplier" },
    { label: "Voucher", icon: BiSolidReport, link: "voucher" },
    { label: "Report", icon: BiSolidReport, link: "reports" },
  ];
  const getFilteredItems = () => {
    switch (user?.role) {
      case "ADMIN":
        return item; // Hiển thị tất cả
      case "DEEMPLOYEE":
        return item.filter((i) => i.label === "Customer's order"); // Hiển thị Customer's order
      case "WHEMPLOYEE":
        return item.filter((i) =>
          [
            "Order",
            "Product",
            "Supplier",
            "Displayed Product",
            "Inventory",
            "Category",
          ].includes(i.label)
        ); // Hiển thị các mục được liệt kê
      default:
        return [];
    }
  };
  const filteredItems = getFilteredItems();
  return (
    <div
      className="w-full grid grid-rows-10 p-5 bg-customGray3 overflow-hidden">
      <div className="row-span-1 flex justify-center pb-5">
        <Header />
      </div>
      <div className="row-span-9 w-full h-full grid grid-cols-5 gap-4">
        <div className="col-span-1 h-fit bg-white shadow-md rounded-[20px] text-sm flex flex-col justify-between">
          <div className="mt-5 flex justify-center">
            <Nav items={filteredItems} />
          </div>
        </div>
        <div className="col-span-4 h-fit">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
