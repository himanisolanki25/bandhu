import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  console.log(allUsers)
  return (
    <div className="">
      <h1 className="px-8 py-2 text-textBrown font-semibold bg-one rounded-md">
        Messages
      </h1>
      <div className=" py-2 flex-1 overflow-y-auto text-white" style={{maxHeight:"calc(84vh - 10vh)"}}>
        {allUsers.map((user,index)=>(
          <User key={index} user={user}/>
        ))}
      </div>
    </div>
  );
}

export default Users;
