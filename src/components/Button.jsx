import React from "react";
import styles from "./Button.module.css";

function Button({ onClick, label, children }) {
  return (
    <button className={styles.toggleButton} onClick={onClick}>
      {children}
      {label}
    </button>
  );
}

export default Button;
