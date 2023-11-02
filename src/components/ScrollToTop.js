import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

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
      <FaArrowUp color="#fff" size={26}/>
    </div>
  );
};

export default ScrollToTop;
