import { Link, useParams } from "react-router-dom";
import EmployeeDetailData from "../../SampleData/employeeDetail.json";

const EmployeeDetail = ({ id }) => {
  const { employeeId } = useParams();
  return (
    <div className="bg-customGray3">
      <div className="text-base grid grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(3,_1fr)] items-center p-6 bg-white shadow-md rounded-[20px]">
        <Link className='flex items-center' to="..">
          <button className="w-[200px] mr-auto text-gray-600 text-lg">&#8592; Employee {employeeId}</button>
        </Link>
        <p className="text-base font-semibold justify-self-center">
          EMPLOYEE INFORMATION
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:w-[55%] mt-4 mx-auto">
        <div className="flex flex-row p-6 gap-6 bg-white shadow-md rounded-[20px]">
          <img
            className="rounded-full w-36 h-36"
            src={EmployeeDetailData.personal.avatar}
            alt="Ảnh nhân viên"
          />
          <div className="flex-grow self-center space-y-2">
            <div className="flex justify-between">
              <p className="font-semibold">Full Name</p>
              <p className="text-gray-700">
                {EmployeeDetailData.personal.name}
              </p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">Employee ID</p>
                <p className="text-gray-700">
                  {EmployeeDetailData.personal.id}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">Position</p>
                <p className="text-gray-700">
                  {EmployeeDetailData.personal.position}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">Start day</p>
                <p className="text-gray-700">
                  {EmployeeDetailData.personal.start}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white shadow-md rounded-[20px] space-y-2">
          <h2 className="text-lg">Account</h2>
          <div>
            <div className="flex justify-between">
              <p className="font-semibold">Username</p>
              <p className="text-gray-700">
                {EmployeeDetailData.account.username}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="font-semibold">Password</p>
              <p className="text-gray-700">**********</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white shadow-md rounded-[20px] space-y-2">
          <h2 className="text-lg ">Salary Information</h2>
          <div className="flex justify-between">
            <p className="font-semibold">Basic Salary</p>
            <p className="text-gray-700">{EmployeeDetailData.salary.current}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Increase</p>
            <p className="text-gray-700">
              {EmployeeDetailData.salary.increase}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Effective</p>
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
