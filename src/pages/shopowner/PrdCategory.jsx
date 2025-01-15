import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { IoIosAdd, IoIosArrowRoundForward, IoIosSearch } from "react-icons/io";
import { RiEditBoxLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import axiosInstance from "../../config/api";
import { Link } from "react-router-dom";

const PrdCategory = () => {
  const TABLE_HEAD = ["No", "Name", "Products"];
  const [isAdding, setIsAdding] = useState(false);
  const newCategoryInputRef = useRef("");

  const [categoryList, setCategoryList] = useState([]);
  const getCategories = async () => {
    const response = await axiosInstance.get("/category");
    console.log(response.data);
    setCategoryList(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const toggleInput = () => {
    setIsAdding(!isAdding);
  };

  const handleAddCategory = async () => {
    if (!newCategoryInputRef.current) {
      return;
    }

    const categoryName = newCategoryInputRef.current;
    const data = { categoryName };
    await axiosInstance.post("/category", data);
    toast.success(`Thêm danh mục thành công ${categoryName}`, {
      autoClose: 3000,
      hideProgressBar: true,
    });
    getCategories();
  };

  const updateNewCategoryInputRef = (e) => {
    newCategoryInputRef.current = e.target.value;
  };

  return (
    <div className='w-full h-full p-5 shadow-sm bg-white rounded-[20px]'>
      <div className='flex justify-between'>
        <div className='flex items-center h-10 px-2 border border-black rounded-[20px]'>
          <input
            className='text-sm pl-2 focus:outline-none'
            placeholder='Find ID or name'></input>
          <button type='submit'>
            <IoIosSearch className='w-6 h-6'></IoIosSearch>
          </button>
        </div>
        <div className='flex'>
          {!isAdding ? (
            // Icon button to show textbox
            <button
              className='h-full flex gap-2 items-center bg-black text-white px-3 rounded-[20px]'
              onClick={toggleInput}>
              <IoIosAdd className='w-6 h-6' />
              <span className='font-medium'>Thêm danh mục</span>
            </button>
          ) : (
            // Textbox with background
            <div className='flex-shrink flex items-center bg-black rounded-[20px] pl-4 pr-2'>
              <input
                className='rounded-md focus:outline-none p-1 bg-transparent text-white'
                placeholder='Category name'
                ref={newCategoryInputRef}
                onChange={updateNewCategoryInputRef}
              />
              <button onClick={handleAddCategory} className='p-0.5 ml-1'>
                <IoIosArrowRoundForward className='w-6 h-6 text-white' />
              </button>
              <button onClick={toggleInput} className='p-0.5'>
                <IoCloseOutline className='w-6 h-6 text-white' />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='mt-4 h-[85%] overflow-y-scroll'>
        <Card className='p-5 w-full flex h-full overflow-scroll px-6'>
          <table className='w-full min-w-max table-auto text-center'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`border-r-[4px] border-white bg-customGray3 pb-4 pt-4 
                    ${index === 0 ? "rounded-l-2xl" : ""} 
                    ${index === TABLE_HEAD.length - 1 ? "rounded-r-2xl" : ""}`}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-bold leading-none'>
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categoryList.map((row, index) => {
                const isLast = index === categoryList.length - 1;
                const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                return (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={`${classes} text-center`}>
                      <Typography variant="small" className="font-normal text-gray-600">
                        {row.categoryName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal text-gray-600">
                        {row.productCount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal text-white">
                        <Link to={row.id}>
                          <button className="bg-black w-20 h-6 rounded-xl">Chi tiết</button>
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

export default PrdCategory;
