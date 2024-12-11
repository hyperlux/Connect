import React, { PropsWithChildren } from 'react';

const MainContent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex-1 pr-6 py-6 bg-[#1a1a1a] text-white min-w-0">
      {children}
    </div>
  );
};

export default MainContent;
