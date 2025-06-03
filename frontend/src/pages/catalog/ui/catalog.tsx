import React from 'react';
import CatalogSidebar from "@/widgets/catalog-sidebar";
import CatalogItemGrid from "@/widgets/catalog-item-grid";

const Catalog: React.FC = () => {
  return (
    <div className={"flex h-full w-full"}>
      <CatalogSidebar />
      <CatalogItemGrid />
    </div>
  );
};

export default Catalog;
