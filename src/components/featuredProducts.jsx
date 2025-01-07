import React from 'react';

const products = [
  {
    id: 1,
    discount: '17%',
    title: 'Laptop ASUS VivoBook 14 OLED A1405VA-KM095W',
    specs: 'i5-13500H | 16GB | 512GB | Intel Iris Xe | 14.0” 2.8K',
    price: '17.390.000₫',
    oldPrice: '20.990.000₫',
    image: 'https://via.placeholder.com/150', // Replace with real image URL
    stars: 5,
  },
  {
    id: 2,
    discount: '16%',
    title: 'Laptop MSI Gaming Thin 15 B13UC-2081VN',
    specs: 'i5-13420H | RTX 3050 | 16GB | 512GB | 15.6” Full HD',
    price: '18.490.000₫',
    oldPrice: '21.990.000₫',
    image: 'https://via.placeholder.com/150',
    stars: 4,
  },
  {
    id: 3,
    discount: '16%',
    title: 'Laptop Dell Vostro 3520 F0VV256',
    specs: 'i5-1235U | 8GB | 256GB | 15.6” Full HD',
    price: '11.690.000₫',
    oldPrice: '13.990.000₫',
    image: 'https://via.placeholder.com/150',
    stars: 4,
  },
  {
    id: 4,
    discount: '11%',
    title: 'Laptop ASUS VivoBook 14 OLED A1405ZA-KM264W',
    specs: 'i5-12500H | 16GB | 512GB | Intel Iris Xe | 14.0” 2.8K',
    price: '15.990.000₫',
    oldPrice: '17.990.000₫',
    image: 'https://via.placeholder.com/150',
    stars: 5,
  },
  {
    id: 5,
    discount: '6%',
    title: 'Laptop Lenovo IdeaPad Slim 5 14IMH9 83DA006TVN',
    specs: 'U5-125H | 16GB | 1TB | Intel Arc | 14” WUXGA',
    price: '22.290.000₫',
    oldPrice: '23.690.000₫',
    image: 'https://via.placeholder.com/150',
    stars: 3,
  },
];

const FeaturedProducts = () => {
  return (
    <div className="bg-red-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Sản Phẩm Nổi Bật</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
            <div className="relative">
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                Giảm {product.discount}
              </span>
              <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded" />
            </div>
            <h3 className="text-sm font-semibold mt-4">{product.title}</h3>
            <p className="text-xs text-gray-500">{product.specs}</p>
            <div className="flex items-center mt-2">
              <span className="text-red-500 font-bold">{product.price}</span>
              <span className="text-gray-400 text-sm line-through ml-2">{product.oldPrice}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-yellow-500 text-sm">
                {'★'.repeat(product.stars)}{'☆'.repeat(5 - product.stars)}
              </span>
              <button className="text-red-500 text-xs font-bold">Yêu thích ♥</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
