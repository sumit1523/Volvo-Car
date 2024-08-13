import React from "react";

const Loader = () => {
  return (
    <div className="progress-container">
      <progress aria-label="Loading" className="spinner" />
    </div>
  );
};

export default Loader;
