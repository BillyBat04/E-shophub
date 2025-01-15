import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của react-datepicker
import axiosInstance from '../../config/api';
import generateVoucher from '../../helpers/generateVoucher';

const AddVoucher = () => {
  const { supplierId } = useParams();
  const navigate = useNavigate();

  const [voucher, setVoucher] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [discount, setDiscount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: voucher,
      startDate,
      endDate,
      discount,
    };

    await axiosInstance.post('/voucher', data);
    navigate('/admin/voucher');
    window.location.reload();
  };

  const generateCode = () => {
    const voucher = generateVoucher()
    setVoucher(voucher)
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-base grid lg:grid-cols-[repeat(3,_1fr)] items-center h-16 bg-white shadow-md rounded-[20px]">
        <Link className="flex items-center" to="..">
          <button className="w-[200px] mr-auto text-gray-600 text-lg">
            &#8592; Voucher {supplierId}
          </button>
        </Link>
        <p className="text-base font-semibold justify-self-center">Thông tin mã giảm giá</p>
      </div>
      <div className="w-2/3 mx-auto mt-4 h-full">
        <div className="grid grid-rows-6 gap-4">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="p-5 row-span-4 w-full h-full bg-white rounded-lg customShadow"
          >
            <h3 className="text-base mb-3 font-semibold">Thông tin chung</h3>
            <div className="pb-3">
              <h5 className="font-normal text-slate-400 mb-2">Mã giảm giá:</h5>
              <input
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black"
              />
              <button onClick={() => generateCode()} className='p-2 bg-black text-white font-bold rounded-md mt-4'>Tạo mã giảm giá</button>
            </div>
            <div className="pb-3">
              <h5 className="font-normal text-slate-400 mb-2">Ngày bắt đầu:</h5>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy" // Định dạng ngày thành dd/MM/yyyy
                className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black"
              />
            </div>
            <div className="pb-3">
              <h5 className="font-normal text-slate-400 mb-2">Ngày hết hạn:</h5>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy" // Định dạng ngày thành dd/MM/yyyy
                className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black"
              />
            </div>
            <div className="pb-3">
              <h5 className="font-normal text-slate-400 mb-2">Mức giảm:</h5>
              <input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black"
              />
            </div>
            <button
              className="bg-black p-2 w-full rounded-md text-white opacity-50 hover:opacity-100 duration-150"
              type="submit"
            >
              Hoàn tất
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVoucher;
