import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger
} from "@/features/sidebar";
import {Filter} from "lucide-react";

const filters = [
  {
    name: "Color",
    options: [
      {label: "Red", value: "red"},
      {label: "Blue", value: "blue"},
      {label: "Green", value: "green"},
    ],
  },
  {
    name: "Size",
    options: [
      {label: "Small", value: "small"},
      {label: "Medium", value: "medium"},
      {label: "Large", value: "large"},
    ],
  },
  {
    name: "Price",
    options: [
      {label: "$0 - $50", value: "0-50"},
      {label: "$51 - $100", value: "51-100"},
      {label: "$101 - $200", value: "101-200"},
    ],
  },
]

const CatalogSidebar: React.FC = () => {
  return (
    <>
      <div className={"md:hidden z-50 fixed bottom-[20px] mt-5 left-4"}>
        <SidebarTrigger>
          <div className="bg-background border shadow-md p-2 rounded-md flex items-center">
            <Filter/>
            <span className="ml-2">Filters</span>
          </div>
        </SidebarTrigger>
      </div>
      <Sidebar className="md:relative md:translate-x-0 md:opacity-100">
        <SidebarHeader className="p-4 flex !flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">
            Filters
          </h2>
          <SidebarTrigger className="md:hidden"/>
        </SidebarHeader>
        <SidebarContent>
          {
            filters.map(filter => (
              <SidebarGroup key={filter.name}>
                <SidebarGroupLabel>{filter.name}</SidebarGroupLabel>
                <SidebarGroupContent className="px-2">
                  <SidebarMenu>
                    {
                      filter.options.map(option => (
                        <SidebarMenuItem key={option.value}>
                          <SidebarMenuButton asChild>
                            <a className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
                              {option.label}
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))
                    }
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          }
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default CatalogSidebar;