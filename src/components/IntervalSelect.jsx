import React from 'react';
import styles from './IntervalSelect.module.css';

const IntervalSelect = ({ value, onChange }) => (
  <select className={styles.select} onChange={onChange} value={value}>
    <option value={1000}>1s</option>
    <option value={2000}>2s</option>
    <option value={5000}>5s</option>
    <option value={10000}>10s</option>
    <option value="custom">Custom</option>
  </select>
);

export default IntervalSelect;
