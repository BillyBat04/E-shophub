/* eslint-disable react/prop-types */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const QRCodeModal = ({ setFile, amount, setQRCodeModalOpen }) => {
    // State để lưu trữ hình ảnh được tải lên
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false); // State để mở/đóng modal ảnh lớn
    const [largeImage, setLargeImage] = useState(null); // State lưu trữ ảnh lớn
    const [img, setImg] = useState('')
    const generateQR = useCallback(async () => {
        const response = await axios.post('https://api.vietqr.io/v2/generate', {
            "accountNo": 6120205968837,
            "accountName": "NGUYEN PHI HOC",
            "acqId": 970405,
            "amount": parseInt(amount),
            "addInfo": "Chuyen tien mua hang tai ESHOP-HUB",
            "format": "text",
            "template": "compact"
        })
        setImg(response.data.data.qrDataURL)
    }, [])

    useEffect(() => {
        generateQR()
    }, [generateQR])

    // Hàm đóng modal chính
    const handleClose = () => {
        setQRCodeModalOpen(false); // Đóng modal chính
    };


    // Hàm xử lý khi tải hình ảnh lên
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result); // Lưu trữ hình ảnh vào state
            };
            reader.readAsDataURL(file); // Đọc hình ảnh dưới dạng base64
        }
    };

    // Hàm mở modal ảnh lớn
    const handleImageClick = (image) => {
        setLargeImage(image); // Lưu trữ ảnh lớn vào state
        setIsImageModalOpen(true); // Mở modal ảnh lớn
    };

    // Hàm đóng modal ảnh lớn
    const handleCloseLargeImage = () => {
        setIsImageModalOpen(false); // Đóng modal ảnh lớn
        setLargeImage(null); // Xóa ảnh lớn
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-w-[400px] relative">
                {/* Icon dấu X để đóng modal */}
                <button onClick={handleClose} className="absolute top-2 right-2 text-2xl text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <h3 className="text-xl font-semibold mb-4">Scan this QR code to complete your payment</h3>
                
                <div className="flex justify-center mb-4">
                    <img src={img} alt="QR Code" className="w-[200px] h-[200px] object-contain" />
                </div>

                {/* Input tải hình ảnh */}
                <div className="mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border p-2 rounded w-full"
                    />
                </div>

                {/* Hiển thị hình ảnh tải lên */}
                {uploadedImage && (
                    <div className="mb-4">
                        <p className="text-sm">Uploaded Image:</p>
                        <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="w-[100px] h-[100px] object-contain cursor-pointer"
                            onClick={() => handleImageClick(uploadedImage)} // Mở ảnh lớn khi nhấp vào
                        />
                    </div>
                )}

                {/* Nút xác nhận */}
                <button onClick={handleClose} className="w-full bg-[#FF424E] text-white py-3 rounded-lg font-semibold mb-2">
                    Confirm
                </button>
            </div>

            {/* Modal ảnh lớn */}
            {isImageModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999]">
                    <div className="bg-white p-4 rounded-lg">
                        <button onClick={handleCloseLargeImage} className="absolute top-4 right-4 text-3xl text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img src={largeImage} alt="Large" className="max-w-[90vw] max-h-[90vh] object-contain" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default QRCodeModal;
