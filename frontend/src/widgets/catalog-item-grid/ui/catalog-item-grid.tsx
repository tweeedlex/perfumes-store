import React, { FC } from 'react';
import ItemGrid from "@/features/item-grid";
import {SidebarInset} from "@/features/sidebar";
import { ICatalogResponse } from "@/shared/model/api/product/types";

interface IProps {
  catalog: ICatalogResponse;
}

const CatalogItemGrid: FC<IProps> = ({ catalog }) => {
  return (
    <SidebarInset className="lg:ml-0">
      <ItemGrid items={catalog.products}/>
    </SidebarInset>
  );
};

export default CatalogItemGrid;
