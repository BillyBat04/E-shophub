import { IoAdd } from "react-icons/io5";
import employeeData from "../../SampleData/employeeList.json";
import { IoIosSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";

const EmployeeList = () => {
  const isDetailPage = location.pathname !== "/admin/employees";
  
  if (isDetailPage) {
    return <Outlet></Outlet>
  }

  return (
    <div className="h-full p-6 bg-white shadow-md rounded-[20px] text-sm">
      <div className="flex justify-between">
        <form className="flex gap-4">
          <div className="grid grid-cols-[1fr_auto] px-4 py-2 border border-black rounded-[20px]">
            <input
              className="focus:outline-none"
              placeholder="Tìm ID, Tên, SĐT"></input>
            <button type="submit">
              <IoIosSearch className="w-6 h-6"></IoIosSearch>
            </button>
          </div>
          <button>
            <FaFilter className="w-6 h-6"></FaFilter>
          </button>
        </form>
        <button className="flex items-center gap-2 bg-black rounded-[20px] px-4 py-2">
          <span className="text-white font-bold">Nhân viên mới</span>
          <IoAdd className="w-6 h-6 text-white"></IoAdd>
        </button>
      </div>

      <div className="mt-4 max-h-[600px] overflow-y-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <td className="employee-th employee-td-id">ID</td>
              <td className="employee-th employee-td-name">Họ tên</td>
              <td className="employee-th employee-td-avatar">Hình ảnh</td>
              <td className="employee-th employee-td-position">Vị trí</td>
              <td className="employee-th employee-td-salary">Lương cơ bản</td>
              <td className="employee-th employee-td-start">Ngày vào làm</td>
              <td className="employee-th employee-td-detail"> - </td>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {employeeData.map((e) => (
              <tr className="hover:bg-gray-100" key={e.id}>
                <td className="employee-td-id">{e.id}</td>
                <td className="employee-td-name">{e.name}</td>
                <td className="employee-td-avatar">
                  <img src={e.avatar} alt="Ảnh nhân viên" />
                </td>
                <td className="employee-td-position">{e.position}</td>
                <td className="employee-td-salary">7.000.000</td>
                <td className="employee-td-start">{e.start}</td>
                <td className="employee-td-detail">
                  <Link to={e.id} className="text-blue-800 underline">
                    Chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
