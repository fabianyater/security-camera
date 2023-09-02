import React from "react";
import styles from "./Button.module.css";

function Button({ onClick, label, title, children }) {
  return (
    <button className={styles.toggleButton} onClick={onClick} title={title}>
      {children}
      {label}
    </button>
  );
}

export default Button;