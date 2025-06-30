import React from 'react';
import CatalogSidebar from "@/widgets/catalog-sidebar";
import CatalogItemGrid from "@/widgets/catalog-item-grid";
import {SidebarProvider} from "@/features/sidebar";

const Catalog: React.FC = () => {
  return (
    <div className="flex h-full w-full">
      <SidebarProvider>
        <CatalogSidebar/>
        <CatalogItemGrid/>
      </SidebarProvider>
    </div>
  );
};

export default Catalog;