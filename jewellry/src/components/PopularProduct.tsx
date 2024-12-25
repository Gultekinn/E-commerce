import React from 'react';

const products = [
  {
    id: 1,
    name: 'Product Name 1',
    href: '#',
    imageSrc: 'https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/bracelet-01-a-400x500.jpg',
    imageAlt: 'Bracelet Product Image',
    hoverImageSrc: 'https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/bracelet-01-b-400x500.jpg',
    originalPrice: '$600.00',
    discountedPrice: '$495.00',
  },
  {
    id: 2,
    name: 'Product Name 2',
    href: '#',
    imageSrc: 'https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/earrings-04-a-400x500.jpg',
    imageAlt: 'Bracelet Product Image',
    hoverImageSrc: 'https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/earrings-04-b-400x500.jpg',
    originalPrice: '$1,700.00',
    discountedPrice: '1,505.00',
  },
  {
    id: 3,
    name: 'Product Name 3',
    href: '#',
    imageSrc: 'https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/earrings-05-a-400x500.jpg',
    imageAlt: 'Bracelet Product Image',
    hoverImageSrc: 'https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/earrings-05-b-400x500.jpg',
    originalPrice: '$600.00',
    discountedPrice: '$495.00',
  },
  {
    id: 4,
    name: 'Product Name 4',
    href: '#',
    imageSrc: 'https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/earrings-06-a-400x500.jpg',
    imageAlt: 'Bracelet Product Image',
    hoverImageSrc: 'https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/earrings-06-b-400x500.jpg',
    originalPrice: '$350.00',
    discountedPrice: '$395.00',
  }
  // Daha fazla ürün buraya eklenebilir...
];

const PopularProduct = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-10">
          <h6 className="text-3xl font-normal font-roboto-condensed tracking-tight">Popular Products</h6>
          <h2 className="text-3xl font-normal font-cinzel text-gray-400">Trending Now</h2>
        </div>

        {/* Ürün Kartları */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-gray-800 rounded-md p-4 shadow-md hover:shadow-lg transition duration-300"
            >
              {/* Görsel */}
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-md object-cover group-hover:opacity-0 transition duration-300"
              />
              <img
                alt={product.imageAlt}
                src={product.hoverImageSrc}
                className="absolute inset-0 w-full h-full rounded-md object-cover opacity-0 group-hover:opacity-100 transition duration-300"
              />

              {/* Hover İkonları */}
              <div className="absolute inset-0 flex items-start justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-300">
                <button className="p-2 rounded-md shadow-md text-white hover:bg-gray-700 mx-1">
                  🛒
                </button>
                <button className="p-2 rounded-md shadow-md text-white hover:bg-gray-700 mx-1">
                  🔍
                </button>
              </div>

              {/* Bilgiler */}
              <div className="mt-4 text-center">
                <h3 className="text-sm font-medium text-white">{product.name}</h3>
                <p className="text-sm text-gray-400 line-through">{product.originalPrice}</p>
                <p className="text-sm font-medium text-white">{product.discountedPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
