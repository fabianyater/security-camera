import React from "react";
import styles from './Tab.module.css'

function Tab({ label, isActive, onClick }) {
  return (
    <button
      className={isActive ? styles.active_tab : styles.tab}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Tab;
