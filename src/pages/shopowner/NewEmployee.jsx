import { IoAdd } from "react-icons/io5";
import employeeData from "../../SampleData/employeeList.json";
import { IoIosSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Card, Typography } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";

const EmployeeList = () => {
  const isDetailPage = location.pathname !== "/admin/employees";
  const TABLE_HEAD = ["ID", "Name", "Image", "Position", "Salary", "Start day"];

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
              placeholder="Find ID, name, phone number"></input>
            <button type="submit">
              <IoIosSearch className="w-6 h-6"></IoIosSearch>
            </button>
          </div>
          <button>
            <FaFilter className="w-6 h-6"></FaFilter>
          </button>
        </form>
        <Link to="addemployee">
          <button className="flex items-center gap-2 bg-black rounded-[20px] px-4 py-2">
            <span className="text-white font-bold">Add new employee</span>
            <IoAdd className="w-6 h-6 text-white"></IoAdd>
          </button>
        </Link>
      </div>

      <div className="mt-4 h-[92%] overflow-y-scroll">
        <Card className="p-5 w-full flex h-full overflow-scroll px-6">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr >
                {TABLE_HEAD.map((head, index) => (
                  <th key={head} className={`border-r-[4px] border-white bg-customGray3 pb-4 pt-4 
                    ${index === 0 ? 'rounded-l-2xl' : ''} 
                    ${index === TABLE_HEAD.length - 1 ? 'rounded-r-2xl' : ''}`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employeeData.map((row, index) => {
                const isLast = index === employeeData.length - 1;
                const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                return (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {row.id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600 flex justify-center"
                      >
                        <img className="w-full" src={row.avatar} alt="Ảnh sản phẩm" />
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.position}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        7.000.000
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {row.start}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-white"
                      >
                        <Link to={row.id}>
                          <button className='bg-black w-20 h-6 rounded-xl'>
                            Detail
                          </button>
                        </Link>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeList;
