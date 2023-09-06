import React from "react";
import styles from "./Button.module.css";

function Button({
  onClick,
  label,
  title,
  isActive,
  children,
  backgroundColor,
}) {
  const buttonStyle = backgroundColor && { background: backgroundColor };

  return (
    <button
      style={buttonStyle}
      className={`${styles.toggleButton} ${
        isActive === false
          ? styles.toggleButtonInactive
          : styles.toggleButtonActive
      }`}
      onClick={onClick}
      title={title}
    >
      {children}
      {label && <p>{label}</p>}
    </button>
  );
}

export default Button;
