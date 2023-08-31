import React, { useState } from "react";
import Tab from "./Tab";
import styles from './Tabs.module.css';

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className={styles.tab_buttons}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          />
        ))}
      </div>
      <div className={styles.tab_content}>
        {tabs.find((tab) => tab.id === activeTab).content}
      </div>
    </div>
  );
}

export default Tabs;
