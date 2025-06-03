import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-full">{children}</main>
  );
};

export default MainLayout;
