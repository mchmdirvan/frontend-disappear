import React from "react";

import Navbar from "./sidebar/navbar";
import { useSidebar } from "../utils/states/sidebarContext";
import SideBar from "./sidebar/sidebar";

export default function Layout(props) {
  const { children } = props;
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  return (
    <div className="w-full overflow-auto flex flex-row">
      <SideBar isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center shadow-md h-20 bg-white w-full">
          <Navbar
            label="Admin"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <div className="flex flex-col flex-grow">{children}</div>
      </div>
    </div>
  );
}