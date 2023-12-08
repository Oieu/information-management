import React from "react";
import { EditListComponent } from "../../homeNavbarComponents/ListComponent";

function EditNavbar({ handleLogout, Icon, name }) {
  return (
    <nav className="h-2/3 w-full flex flex-col m-auto items-center justify-between lg:items-end">
      <EditListComponent name={name} />
      <div className="w-full flex justify-center">
        <button
          onClick={handleLogout}
          className="flex justify-center items-center gap-2 transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-100 hover:bg-red-800 duration-300 w-2/3 mb-5"
        >
          {Icon}
          Logout
        </button>
      </div>
    </nav>
  );
}

export default EditNavbar;
