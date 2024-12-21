import React from 'react'
import { FaTrashCan, FaFilter } from "react-icons/fa6";
import { IoIosSearch, IoIosArrowBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { Card, Typography } from "@material-tailwind/react";
import categoryList from "../../SampleData/categoryList.json"
import Switcher from '../../components/togglebutton';

const PrdCategory = () => {
    const TABLE_HEAD = ["Select", "Name", "Parent category", "Number of subcategories", "Status"];
    return (
        <div className='w-full h-full p-5 shadow-sm bg-white rounded-[20px]'>
            <div className='h-[15%] w-full flex justify-between'>
                <div className='flex p-2 flex-col justify-start items-center w-[30%] h-[90%] bg-black rounded-lg'>
                    <span className='mb-1  text-white '>Add Category</span>
                    <input className='p-2 w-[95%] h-[70%] rounded-md '></input>
                </div>
                <div className='flex flex-col justify-between'>
                    <div className=' flex gap-5 items-center '>
                        <FaTrashCan className='h-5 w-5' />
                        <FaEdit className='h-5 w-5' />
                        <FaFilter className='h-5 w-5' />

                        <div className=" flex justify-center items-center h-10 border border-black rounded-[20px]">
                            <input
                                className="pl-4 w-[80%] focus:outline-none"
                                placeholder="Find ID or name"></input>
                            <button type="submit">
                                <IoIosSearch className="w-6 h-6"></IoIosSearch>
                            </button>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center justify-end'>
                        <button className='h-5 w-5'><IoIosArrowBack className='h-5 w-5' /></button>
                        <span className='text-lg'>Back</span>
                    </div>
                </div>

            </div>
            <div className="mt-4 h-[85%] overflow-y-scroll">
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
                            {categoryList.map((row, index) => {
                                const isLast = index === categoryList.length - 1;
                                const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                                return (
                                    <tr key={row.name} className="hover:bg-gray-50">
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                <Switcher status={row.select} />
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
                                                className="font-normal text-gray-600"
                                            >
                                                {row.parent}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                className="font-normal text-gray-600"
                                            >
                                                {row.sub}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                className="font-normal text-gray-600"
                                            >
                                                <Switcher status={row.status} />
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
    )
}

export default PrdCategory
