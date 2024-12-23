/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../config/api";
import formatNumber from "../helpers/formatNumber";

const ModalOrder = ({ setIsOpen, invoiceId }) => {
  const [list, setList] = useState([]);

  const getList = useCallback(async () => {
    const response = await axiosInstance.get(`/invoice-detail/${invoiceId}`);
    setList(response.data); // Giả định response trả về danh sách dữ liệu
  }, [invoiceId]);

  useEffect(() => {
    getList()
  }, [getList])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg relative w-1/3">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Đơn hàng</h3>
          </div>
          {list.map((item, index) => {
            return (
                <div key={index} className="mt-4 flex">
                    <img
                    src={item.displayedProduct.product.image}
                    alt="Product"
                    className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                    <p className="font-semibold">
                        {item.displayedProduct.product.productName}
                    </p>
                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-lg text-[#FF424E] ml-4">
                        {formatNumber(item.totalPrice)} đ
                    </p>
                </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalOrder;
