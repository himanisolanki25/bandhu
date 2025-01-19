import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

function Left() {
  return (
    <div className=" w-full text-gray-300 bg-myBrown">
      <Search />
      <div
        className=" flex-1  overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>
      <div className="bg-[gray]">
        <Logout />
      </div>
    </div>
  );
}

export default Left;
