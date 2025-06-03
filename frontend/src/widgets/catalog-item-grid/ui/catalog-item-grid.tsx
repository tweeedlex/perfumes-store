import React from 'react';
import ItemGrid from "@/features/item-grid";

const items = [
  {
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    tagText: "Top Seller",
    productName: "Nike Air Max 270",
    originalPrice: 199.99,
    salePrice: 149.99,
    freeShipping: true,
    reviewCount: 128,
    rating: 4.7,
    maxRating: 5,
    currencyPrefix: "$"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1512499617640-c2f999098c30?auto=format&fit=crop&w=400&q=80",
    tagText: "New",
    productName: "Adidas Ultraboost 21",
    originalPrice: 179.99,
    salePrice: 159.99,
    freeShipping: false,
    reviewCount: 54,
    rating: 4.4,
    maxRating: 5,
    currencyPrefix: "$"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    tagText: "Limited",
    productName: "Converse Chuck Taylor",
    originalPrice: 89.99,
    salePrice: 79.99,
    freeShipping: true,
    reviewCount: 231,
    rating: 4.9,
    maxRating: 5,
    currencyPrefix: "$"
  }
]


const CatalogItemGrid = () => {
  return (
    <ItemGrid items={items} />
  );
};

export default CatalogItemGrid;
