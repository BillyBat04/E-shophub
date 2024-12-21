import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const AddressModal = ({setAddress}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    town: '',
    district: '',
    province: '',
    address: ''
  });


  const [city, setCity] = useState([])
  const [district, setDistrict] = useState([])
  const [ward, setWard] = useState([])

  const getCity = useCallback(async () => {
    const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm') 
    setCity(response.data.data)
  }, [])

  useEffect(() => {
    getCity()
  }, [getCity])

  const handleChangeCity = async (e) => {
    const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${e.target.value}.htm`)
    setDistrict(response.data.data)
  }
  
  const handleDistrictChange = async e => {
    
    const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${e.target.value}.htm`)
    setWard(response.data.data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false); // Đóng modal khi submit
    let nameProvince = ''
    let nameDistrict = ''
    let nameWard = ''
    for (let i = 0; i < city.length; i++) if (city[i].id == formData.province) {
        nameProvince = city[i].full_name
        console.log(city[i].name)
    }
    for (let i = 0; i < district.length; i++) if (district[i].id == formData.district) nameDistrict = district[i].full_name
    for (let i = 0; i < ward.length; i++) if (ward[i].id == formData.town) nameWard = ward[i].full_name
    setAddress({
        name: formData.name,
        phone: formData.phone,
        city: nameProvince,
        district: nameDistrict,
        ward: nameWard,
        address: formData.address
    })
  };

  return (
    <div className="">
      {/* Button để mở modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-blue-500 font-bold"
      >
        Thêm địa chỉ
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 relative">
            <span
              className="absolute top-2 right-2 text-2xl cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h2 className="text-2xl font-semibold mb-4">Thêm địa chỉ</h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium mb-2">Họ và tên:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />

              <label className="block text-sm font-medium mb-2">Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />

              <label className="block text-sm font-medium mb-2">Thành phố:</label>
              <select
                name="province"
                value={formData.province}
                onChange={e => {handleChangeCity(e); handleInputChange(e)}}
                required
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              >
                <option value="">Chọn thành phố</option>
                {city.map((city, index) => (
                  <option key={index} value={city.id}>{city.full_name}</option>
                ))}
              </select>
              <label className="block text-sm font-medium mb-2">Quận:</label>
                <select
                name="district"
                value={formData.district}
                onChange={e => {handleDistrictChange(e); handleInputChange(e)}}
                required
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                >
                <option value="">Chọn quận</option>
                {district.map((item, index) => (
                    <option key={index} value={item.id}>{item.full_name}</option>
                ))}
                </select>
              <label className="block text-sm font-medium mb-2">Xã:</label>
              <select
                name="town"
                value={formData.town}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              >
                <option value="">Chọn xã</option>
                {ward.map((ward, index) => (
                  <option key={index} value={ward.id}>{ward.full_name}</option>
                ))}
              </select>



              <label className="block text-sm font-medium mb-2">Địa chỉ chi tiết</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Lưu
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressModal;
