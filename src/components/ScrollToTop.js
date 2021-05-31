import React from "react";

const ScrollToTop = () => {
  return (
    <div className="circle" onClick={() => window.scrollTo(0,0)}>
      <i className="fas fa-arrow-up"></i>
    </div>
  );
};

export default ScrollToTop;
