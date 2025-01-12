import { useCallback, useEffect, useState } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, Outlet, useLocation } from "react-router-dom";
import { IoAdd } from 'react-icons/io5';
import { FaFilter } from "react-icons/fa6";
import axiosInstance from '../../config/api';
import formatDate from '../../helpers/formatDate';
import formatNumber from '../../helpers/formatNumber';

const CustomerOrderManagement = () => {
  const TABLE_HEAD = ["No", "Order Date", "Shipping Address", "Total Price", "Supplier" , "Image" ,"Status"];
  const [supplyOrders, setSupplyOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState({ sortBy: "date", sortOrder: "asc", status: "", open: false });
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const [selectedRow, setSelectedRow] = useState(null); // Lưu thông tin hàng khi click

  const location = useLocation();

  const getList = useCallback(async () => {
    const response = await axiosInstance.get('/invoice');
    setSupplyOrders(response.data);
    setFilteredOrders(response.data); // Initially, show all data
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  // Handle sorting và filter
  const handleSortAndFilter = (sortBy, sortOrder, status) => {
    let filteredOrdersList = [...supplyOrders];

    if (status) {
      filteredOrdersList = filteredOrdersList.filter(order => order.status === status);
    }

    if (sortBy === "date") {
      filteredOrdersList.sort((a, b) => {
        const dateA = new Date(a.orderDate);
        const dateB = new Date(b.orderDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === "status") {
      filteredOrdersList.sort((a, b) => {
        const statusA = a.status.toUpperCase();
        const statusB = b.status.toUpperCase();
        return sortOrder === "asc" ? statusA.localeCompare(statusB) : statusB.localeCompare(statusA);
      });
    }

    setFilteredOrders(filteredOrdersList);
  };

  const handleStatusChange = async (id, status) => {
    await axiosInstance.patch(`/invoice/${id}`, { status });
    getList(); // Refresh the list after the status is updated
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

  const isDetailPage = location.pathname !== "/admin/customer-order";

  if (isDetailPage) {
    return <Outlet />;
  }

  // Hàm mở modal và lưu thông tin đơn hàng
  const handleDetailClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className='w-full h-full flex'>
      <div className='w-full h-full flex flex-col'>
        {/* Các phần hiển thị tổng quan */}
        {/* ... */}

        <Card className="p-5 w-full flex h-4/5 bg-white shadow-md rounded-[20px] overflow-scroll px-6">
          <div className='flex items-center h-14 mb-2 justify-between'>
            {/* Menu component for Filter */}
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton
                className="flex items-center bg-white text-sm font-medium p-2 rounded-md hover:bg-gray-100"
                onClick={() => setFilter({ ...filter, open: !filter.open })}
              >
                <FaFilter className="w-6 h-6 mr-2" />
                <span>Filter</span>
                <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" />
              </MenuButton>
              {filter.open && (
                <MenuItems className="flex flex-col items-start absolute right-auto z-10 w-56 bg-white rounded-lg customShadow">
                  <MenuItem className="w-full" onClick={() => handleSortAndFilter("date", filter.sortOrder, filter.status)}>
                    <span className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sort by Date</span>
                  </MenuItem>
                  <MenuItem className="w-full" onClick={() => handleSortAndFilter("status", filter.sortOrder, filter.status)}>
                    <span className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sort by Status</span>
                  </MenuItem>
                  <MenuItem className="w-full" onClick={() => setFilter({ ...filter, status: "PROCESSING" })}>
                    <span className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Filter by Processing</span>
                  </MenuItem>
                  <MenuItem className="w-full" onClick={() => setFilter({ ...filter, status: "COMPLETED" })}>
                    <span className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Filter by Completed</span>
                  </MenuItem>
                  {/* Các trạng thái khác */}
                </MenuItems>
              )}
            </Menu>

            <Link className="bg-black rounded-[20px] h-10 w-[160px] flex justify-center" to="/admin/orders/create">
              <button className="flex items-center">
                <span className="text-white font-bold">Create order</span>
                <IoAdd className="w-6 h-6 ml-2 text-white" />
              </button>
            </Link>
          </div>

          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th key={head} className={`border-r-[4px] border-white bg-customGray3 pb-4 pt-4 
                    ${index === 0 ? 'rounded-l-2xl' : ''} 
                    ${index === TABLE_HEAD.length - 1 ? 'rounded-r-2xl' : ''}`}>
                    <Typography variant="small" color="blue-gray" className="font-bold leading-none">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((row, index) => {
                const isLast = index === filteredOrders.length - 1;
                const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                return (
                  <tr key={row.no} className="hover:bg-blue-50 transition-all duration-200">
                    <td className={`${classes} p-4 border-b`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold text-center">
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={`${classes} p-4 border-b`}>
                      <Typography variant="small" className="text-gray-700 font-medium">
                        {formatDate(row.invoiceDate)}
                      </Typography>
                    </td>
                    <td className={`${classes} p-4 border-b`}>
                      <Typography variant="small" className="text-gray-600 truncate max-w-xs">
                        {row.address}
                      </Typography>
                    </td>
                    <td className={`${classes} p-4 border-b`}>
                      <Typography variant="small" className="text-green-600 font-semibold">
                        {formatNumber(row.totalPrice)}đ
                      </Typography>
                    </td>
                    <td className={`${classes} p-4 border-b`}>
                      <Typography variant="small" className="text-gray-700">
                        {row.customer.fullName}
                      </Typography>
                    </td>
                    <td className={`${classes} p-4 border-b`}>
                      <Typography variant="small" className="text-gray-700">
                        <img className="w-[60px] h-[60px] rounded-md" src={row.paymentImg} alt="Ảnh sản phẩm" />
                      </Typography>
                    </td>
                    <td className={`${classes} p-4 border-b`}>
  <div className="flex items-center justify-center space-x-2">
    <span
      className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(row.status)}`}
    >
      {row.status}
    </span>
    <Menu as="div" className="relative">
      <MenuButton>
        <ChevronDownIcon className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-all" />
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
        {["PROCESSING", "SHIPPING", "COMPLETED", "CANCELED"].map((status) => (
          <MenuItem key={status} as="button" onClick={() => handleStatusChange(row.id, status)}>
            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {status}
            </span>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  </div>
</td>

                    <td className={`${classes} p-4 border-b`}>
                      <button
                        onClick={() => handleDetailClick(row)} // Mở modal khi click vào Detail
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Modal hiển thị thông tin chi tiết */}
      {isModalOpen && selectedRow && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
            <div className="text-lg font-bold mb-4">Order Details</div>
            <div className="space-y-2">
              <p><strong>Invoice Date:</strong> {formatDate(selectedRow.invoiceDate)}</p>
              <p><strong>Address:</strong> {selectedRow.address}</p>
              <p><strong>Total Price:</strong> ${selectedRow.totalPrice.toFixed(2)}</p>
              <p><strong>Customer:</strong> {selectedRow.customer.fullName}</p>
              <p><strong>Status:</strong> {selectedRow.status}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}  // Đóng modal
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerOrderManagement;
