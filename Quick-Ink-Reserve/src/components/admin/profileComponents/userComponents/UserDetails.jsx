import React from "react";

function UserDetails({ user }) {
  const userWords = user.userName.split(" ");
  return (
    <div className="my-auto hidden sm:block flex-grow">
      <h1 className="text-2xl text-left whitespace-nowrap overflow-hidden overflow-ellipsis max-w-1/2" style={{ fontFamily: "Inder" }}>
        {userWords[0] + " " + (userWords[1] ? userWords[1][0] + "." : "")}
      </h1>
      <h2 className="text-sm text-left" style={{ fontFamily: "Inder" }}>
        {user.userRole.toLowerCase()}: <br/>{user.userEmail}
      </h2>
    </div>
  );
}

export default UserDetails;
