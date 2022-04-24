import React from "react";

const Loader = () => {
  return(
    <div className="w-full h-screen">
      <span className="block m-auto animate-ping mt-20 w-10 p-15 h-10 rounded-full bg-indigo-600">&nbsp;</span>
    </div>
  )
};

export default Loader;