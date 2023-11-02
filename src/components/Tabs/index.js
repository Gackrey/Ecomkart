import React from "react";
import Tab from "./Tab";

export default function Tabs({ children }) {
  const label = children[0].props.label;
  const [activeTab, setActiveTab] = React.useState(label);

  function onClickTabItem(tab) {
    setActiveTab(tab);
  }
  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}
