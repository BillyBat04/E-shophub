import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/api';
import formatNumber from '../helpers/formatNumber';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const productLimit = 5;

const FeaturedProducts = ({categoryName}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => { 
    const getFeaturedProducts = async () => {
      const response = await axiosInstance(`/displayed-product/featured/${categoryName}?limit=${productLimit}`);
      setProducts(response.data);
    }

    getFeaturedProducts();
  }, [categoryName]);


  return (
    <div className="bg-red-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Sản Phẩm Nổi Bật</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <Link key={product.SKU} to={`/detail-product/${product.SKU}`}>
            <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
            <div className="bg-white shadow-lg rounded-lg p-4">
              <div>
                <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded" />
              </div>
              <h3 className="text-sm font-semibold mt-4 line-clamp-1">{product.productName}</h3>
              <p className="text-xs text-gray-500">{product.cpu} | {product.ram}GB | {product.hardDrive}GB</p>
              <div className="flex items-center mt-2">
                <span className="text-red-500 font-bold">{formatNumber(product.sellingPrice)}đ</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-yellow-500 text-sm">
                  {/* {'★'.repeat(product.stars)}{'☆'.repeat(5 - product.stars)} */}
                  {'★'.repeat(5)}
                </span>
              </div>
            </div>
            </motion.div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
