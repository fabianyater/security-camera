import React from 'react';
import styles from './CustomIntervalInput.module.css';

const CustomIntervalInput = ({ value, onChange, onApply }) => (
  <div className={styles.customInput}>
    <input
      className={styles.input}
      type="number"
      value={value}
      onChange={onChange}
      min={0}
    />
    <button className={styles.button} onClick={onApply}>
      Apply
    </button>
  </div>
);

export default CustomIntervalInput;
