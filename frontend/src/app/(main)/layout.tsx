import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="text-gray-500">Sidebar</div>
        </div>
      </div>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
};

export default MainLayout;
