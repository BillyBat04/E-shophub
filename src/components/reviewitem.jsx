import React from 'react';

const ReviewItem = ({ reviewer, rating, date, reviewText, images }) => {
    return (
        
        <div className='pr-10 pl-10 pt-8 pb-5'>
            <div className="w-full flex flex-row justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        src={reviewer.avatar}
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{reviewer.name}</p>
                        <p className="flex items-center">
                            <span className="text-lg font-bold">{rating}</span>
                            <span className="text-yellow-500 ml-1">★</span>
                        </p>
                    </div>
                </div>
                <div >
                    <span className="text-gray-500">{date}</span>
                </div>
            </div>
            <div className="bg-black w-[60%] text-white text-center py-4 px-4 rounded-2xl font-semibold mt-4">
                {reviewText}
            </div>
            <div className="flex space-x-4 mt-4">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Review Image ${index + 1}`}
                        className="w-20 h-20 rounded-lg"
                    />
                ))}
            </div>
        </div>
    );
};

export default ReviewItem;
