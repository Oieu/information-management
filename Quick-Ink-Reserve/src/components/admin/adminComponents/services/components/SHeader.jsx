import React from "react";

function SHeader() {
  return (
    <header className="flex flex-col gap-5 ml-5 h-1/10">
      <div className="flex items-center gap-10 w-[90%]">
        <h1 className="text-left">Services</h1>
      </div>
      <p className="text-left">
        This component will allow the admin to see the available services based
        on materials, add new services to the existing list, and edit the
        details to existing services.
      </p>
    </header>
  );
}

export default SHeader;
