/* eslint-disable react/prop-types */
function DeleteModal({isModalOpen, setIsModalOpen}) {

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle confirmation action
  const handleConfirm = () => {
    alert("Confirmed!");
    setIsModalOpen(false);
  };

  return (
    <div className="fixed">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80">
            <div className="flex justify-between items-center">
              <div>
              <h2 className="text-lg font-semibold">Bạn có muốn xóa sản phẩm đang chọn?</h2>
              </div>
              <button
                onClick={closeModal}
                className="text-2xl font-bold text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteModal;
