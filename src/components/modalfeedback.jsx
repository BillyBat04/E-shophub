/* eslint-disable react/prop-types */
import { useState } from "react";
import axiosInstance from "../config/api";
import useUser from "../hooks/useUser";

const ModalFeedback = ({SKU}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState("");
  const {user} = useUser()
  const handleRating = (value) => setRating(value);

  const handleSubmit = async () => {

    const displayedProduct = await axiosInstance.get(`/displayed-product/${SKU}`)
    const customer = await axiosInstance.get(`/customer/get-by-user/${user.id}`)
    console.log(displayedProduct)
    const data = {
      customerId: customer.data.id,
      displayedProductId: displayedProduct.data[0].id,
      rating,
      content: feedback
    }

    console.log(data)

    await axiosInstance.post(`/feedback`, data)
    setIsModalOpen(false);
    setRating(1);
    setFeedback("");
    window.location.reload()
  };

  return (
    <div className="">
      {/* Button to open modal */}
      <button
        className="px-4 py-2 bg-black font-bold text-white rounded-md"
        onClick={() => setIsModalOpen(true)}
      >
        Viết đánh giá
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Viết đánh giá của bạn về sản phẩm này</h2>

            {/* Star Rating */}
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-3xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* Feedback Input */}
            <textarea
              className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleSubmit}
                disabled={!rating || !feedback.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalFeedback;
