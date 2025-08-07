import React from 'react';
import ProductCard from "@/entities/product-card"
import { IProduct } from "@/shared/model/api/product/types";

interface IProps {
  items: IProduct[];
}


// {
//     imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//     tagText: "Limited",
//     productName: "Converse Chuck Taylor",
//     originalPrice: 89.99,
//     salePrice: 79.99,
//     freeShipping: true,
//     reviewCount: 231,
//     rating: 4.9,
//     maxRating: 5,
//     currencyPrefix: "$"
//   }

const ItemGrid: React.FC<IProps> = ({items}) => {
  return (
    <div className="pt-4 pb-2 items-center grid gap-4 px-3
                grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]
                sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]
                md:grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]
                lg:grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]">
      {
        items.map((item: IProduct)  => (
          <ProductCard
            key={item._id}
            imageUrl={"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"}
            tagText={item.label}
            productName={item.name}
            originalPrice={item.price}
            salePrice={item.discountPrice}
            currencyPrefix={"₴"}
            className={"h-full w-full"}
          />
        ))
      }
    </div>
  );
};

export default ItemGrid;
