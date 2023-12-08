import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import BeatLoader from "react-spinners/BeatLoader";

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

export function LoadingComponentDots(loading) {
  return (
    <div className="w-2/5 h-2/5 m-auto p-5 bg-gray-500 absolute top-1/4 left-1/3 rounded-xl">
      <BeatLoader
        color={"#ffffff"}
        loading={loading}
        size={30}
        aria-label="Loading Ladder"
        className="absolute top-1/4 left-[40%]"
      />
      <h1 className="absolute text-center left-1/4 top-[70%]">
        Please wait...
      </h1>
    </div>
  )
}

export default LoadingComponent;
