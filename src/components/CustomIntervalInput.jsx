import React from "react";
import styles from "./CustomIntervalInput.module.css";
import Button from "./Button";

const CustomIntervalInput = ({ value, onChange, onApply }) => (
  <div className={styles.customInput}>
    <input
      className={styles.input}
      type="number"
      value={value}
      onChange={onChange}
      min={1}
    />
    <Button
      onClick={onApply}
      title="Apply new value"
      label="Apply"
      backgroundColor="#007BFF"
    />
  </div>
);

export default CustomIntervalInput;
