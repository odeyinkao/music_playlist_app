import React from "react";

const ErrorMessage = ({ message }) => {
  return <p className="text-center tracking-wider font-mono">{message ? message : "An error occurred. Please reload page!"}</p>
};

export default ErrorMessage;