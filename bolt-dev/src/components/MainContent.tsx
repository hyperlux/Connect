import React, { PropsWithChildren } from 'react';

const MainContent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex-1 w-full bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white">
      {children}
    </main>
  );
};

export default MainContent;
