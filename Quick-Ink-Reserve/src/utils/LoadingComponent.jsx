import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

function LoadingComponent(loading) {
  return (
    <div className="w-2/5 h-2/5 m-auto p-5 bg-gray-500 relative rounded-xl">
      <ClimbingBoxLoader
        color={"#ffffff"}
        loading={loading}
        size={30}
        aria-label="Loading Ladder"
        className="absolute top-1/4 left-[40%]"
      />
      <h1 className="absolute text-center left-1/4 top-[70%]">
        Fetching data...
      </h1>
    </div>
  );
}

export default LoadingComponent;
