import React from 'react'

const AccessoryCard = ({product}) => {
    return (
        <div className=' h-full w-full '>
            <div className='relative  h-full w-full flex items-center justify-end'>
                <div className='w-[80%] h-[70%] flex flex-col justify-center items-center bg-white shadow-2xl'>
                    <div className='ml-[25%] justify-center items-center flex flex-col'>
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-lg font-bold text-gray-700 mb-6">{product.price}</p>
                        <div className="flex gap-4">
                            <button className="h-[40px] w-[80px] bg-black text-white rounded-full text-[12px] ">
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center mr-[57%]  absolute h-[70%] aspect-square  rounded-full'
                style={{ backgroundColor: product.color }}>
                    <img src={product.mainImage}
                        className='w-[80%] h-[80%] mt-[15%] ml-[10%]' />
                </div>
            </div>
        </div>
    )
}

export default AccessoryCard;
