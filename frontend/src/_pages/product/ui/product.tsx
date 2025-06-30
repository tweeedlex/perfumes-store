"use client";

import Banner_08 from "@/entities/commerce-ui/banner-08";
import Review_04 from "@/entities/commerce-ui/review-04";
import Product from "@/widgets/product/ui/product";
import { ProductInfo } from "@/widgets/product/ui/product-info";
// import { StoreHeader } from "@/entities/ui/commerce-ui/store-header";
// import { StoreNavigation } from "@/entities/ui/commerce-ui/store-navigation";

export default function ProductPage_01() {
  return (
    <div className="relative flex justify-center min-h-screen w-full">
      <main className="max-w-container p-3 pt-0">
        <div className="lg:py-8 py-3">
          <Banner_08 />
          <Product />
        </div>
        <ProductInfo />
        <div>
          <Review_04 />
        </div>
      </main>
    </div>
  );
}
