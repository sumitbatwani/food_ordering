import React from "react";
import Header from "./components/Header";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <div className="flex flex-1 min-w-0">
        <main className="flex-1 h-full py-6 overflow-auto">
          <div className="h-full px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
