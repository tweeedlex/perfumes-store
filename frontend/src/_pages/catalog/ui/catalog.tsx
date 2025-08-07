import React from 'react';
import CatalogSidebar from "@/widgets/catalog-sidebar";
import CatalogItemGrid from "@/widgets/catalog-item-grid";
import {SidebarProvider} from "@/features/sidebar";
import { getCatalog } from "@/shared/model/api/product";

const Catalog: React.FC = async () => {
  const response = await getCatalog();

  return (
    <div className="flex h-full w-full">
      <SidebarProvider>
        {/*<CatalogSidebar filters={response.data.filters} />*/}
        <CatalogSidebar />
        <CatalogItemGrid catalog={response.data}/>
      </SidebarProvider>
    </div>
  );
};

export default Catalog;