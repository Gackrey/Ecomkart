import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 100); // Show the button when scrolling down by 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`scrollToTop ${isVisible ? "show" : "hide"}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <i className="fas fa-arrow-up"></i>
    </div>
  );
};

export default ScrollToTop;
