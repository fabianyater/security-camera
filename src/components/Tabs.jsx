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
      <nav>
        <ul className={styles.tab_buttons}>
          {tabs.map((tab) => (
            <li className={styles.tab_item}>
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
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.tab_content}>
        {tabs.find((tab) => tab.id === activeTab).content}
      </div>
    </>
  );
}

export default Tabs;
