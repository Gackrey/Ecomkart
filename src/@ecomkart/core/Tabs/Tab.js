import React from "react";

export default function Tab({ activeTab, label, onClick }) {
  const handleClick = () => {
    onClick(label);
  };
  return (
    <>
      <li
        className={`tab-list-item
        ${activeTab === label ? "tab-list-active" : ""}`}
        onClick={handleClick}
      >
        {label}
      </li>
    </>
  );
}
