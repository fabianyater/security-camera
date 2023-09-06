import React, { useState } from "react";
import styles from "./Tabs.module.css";
import Button from "./Button";

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className={styles.tab_buttons}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
            title={tab.label}
            backgroundColor={tab.background}
            activeBackgroundColor={tab.activeBackgroundColor}
            inactiveBackgroundColor={tab.inactiveBackgroundColor}
          >
            <img src={tab.src} alt={tab.alt} />
          </Button>
        ))}
      </div>
      <div className={styles.tab_content}>
        {tabs.find((tab) => tab.id === activeTab).content}
      </div>
    </>
  );
}

export default Tabs;
