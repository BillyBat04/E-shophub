import { Link } from "react-router-dom";
import EmployeeDetailData from "../../SampleData/employeeDetail.json";
import { IoChevronBack } from "react-icons/io5";

const EmployeeDetail = ({ id }) => {
  return (
    <div className="bg-customGray3">
      <div className="text-base grid grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(3,_1fr)] items-center p-6 bg-white shadow-md rounded-[20px]">
        <Link className="flex items-center gap-2 hover:underline" to="..">
          <IoChevronBack className="w-6 h-6"></IoChevronBack>
          <span>Danh sách</span>
        </Link>
        <p className="text-base font-semibold justify-self-center">
          THÔNG TIN NHÂN VIÊN
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:w-[55%] mt-4 mx-auto">
        <div className="flex flex-row p-6 gap-6 bg-white shadow-md rounded-[20px]">
          <img
            className="rounded-full w-36 h-36"
            src={EmployeeDetailData.personal.avatar}
            alt="Ảnh nhân viên"
          />
          <div className="flex-grow self-center space-y-2">
            <div className="flex justify-between">
              <p className="font-semibold">Họ tên</p>
              <p className="text-gray-700">
                {EmployeeDetailData.personal.name}
              </p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">ID Nhân viên</p>
                <p className="text-gray-700">
                  {EmployeeDetailData.personal.id}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">Vị trí</p>
                <p className="text-gray-700">
                  {EmployeeDetailData.personal.position}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">Ngày vào làm</p>
                <p className="text-gray-700">
                  {EmployeeDetailData.personal.start}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white shadow-md rounded-[20px] space-y-2">
          <h3 className="text-xl">Tài khoản</h3>
          <div>
            <div className="flex justify-between">
              <p className="font-semibold">Tên đăng nhập</p>
              <p className="text-gray-700">
                {EmployeeDetailData.account.username}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="font-semibold">Mật khẩu</p>
              <p className="text-gray-700">**********</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white shadow-md rounded-[20px] space-y-2">
          <h3>Thông tin lương</h3>
          <div className="flex justify-between">
            <p className="font-semibold">Lương cơ bản</p>
            <p className="text-gray-700">{EmployeeDetailData.salary.current}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Mức tăng</p>
            <p className="text-gray-700">
              {EmployeeDetailData.salary.increase}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Hiệu lực từ</p>
            <p className="text-gray-700">
              {EmployeeDetailData.salary.effective}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
