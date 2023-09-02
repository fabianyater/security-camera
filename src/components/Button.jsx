import React from "react";
import styles from "./Button.module.css";

function Button({ onClick, label, title, isActive, children }) {
  return (
    <button
      className={`${styles.toggleButton} ${
        isActive === false
          ? styles.toggleButtonInactive
          : styles.toggleButtonActive
      }`}
      onClick={onClick}
      title={title}
    >
      {children}
      {label}
    </button>
  );
}

export default Button;
