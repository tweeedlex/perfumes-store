import React from 'react';
import ProductCard, {ProductCardProps} from "@/features/product-card"

interface IProps {
  items: ProductCardProps[];
}

const ItemGrid: React.FC<IProps> = ({ items }) => {
  return (
    <div className={"flex-1 flex w-full p-5 gap-5 flex-wrap items-start"}>
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
          />
        ))
      }
    </div>
  );
};

export default ItemGrid;
