import React from "react";
import UserContainer from "./UserContainer";

function UserWrapper({ user, maxWidth }) {
  return (
    <div
      className={`flex justify-center align-baseline h-full ${
        user ? "hide-on-mobile" : "show-on-mobile"
      } ${maxWidth ? `w-[${maxWidth}]` : ""}`}
    >
      <UserContainer user={user} maxWidth={maxWidth} />
    </div>
  );
}

export default UserWrapper;
