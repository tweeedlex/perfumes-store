import React from 'react';
import ProductCard, {ProductCardProps} from "@/features/product-card"

interface IProps {
  items: ProductCardProps[];
}

const ItemGrid: React.FC<IProps> = ({items}) => {
  return (
    <div className="pt-4 pb-2 items-center grid gap-4 px-3
                grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]
                sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]
                md:grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]
                lg:grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]">
      {
        items.map(item => (
            <ProductCard
              key={item.productName}
              imageUrl={item.imageUrl}
              tagText={item.tagText}
              productName={item.productName}
              originalPrice={item.originalPrice}
              salePrice={item.salePrice}
              freeShipping={item.freeShipping}
              reviewCount={item.reviewCount}
              rating={item.rating}
              maxRating={item.maxRating}
              currencyPrefix={item.currencyPrefix}
              className={"h-full w-full"}
            />
        ))
      }
    </div>
  );
};

export default ItemGrid;
