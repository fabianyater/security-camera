// CaptureIntervalSelector.jsx

import React, { useState } from "react";
import styles from "./CaptureIntervalSelector.module.css";
import IntervalSelect from "./IntervalSelect";
import CustomIntervalInput from "./CustomIntervalInput";

function CaptureIntervalSelector({ customInterval, onChangeInterval }) {
  const [isCustom, setIsCustom] = useState(false);
  const [tempCustomInterval, setTempCustomInterval] = useState(
    customInterval ? customInterval / 1000 : 0
  );
  const CUSTOM = "custom";

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === CUSTOM) {
      setIsCustom(true);
    } else {
      setIsCustom(false);

      onChangeInterval(Number(value));
    }
  };

  const handleApplyCustomInterval = () => {
    onChangeInterval(Number(tempCustomInterval) * 1000);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Intervalo de captura en segundos: </label>
      <IntervalSelect
        onChange={handleSelectChange}
        value={isCustom ? CUSTOM : customInterval}
      />
      {isCustom && (
        <CustomIntervalInput
          onApply={handleApplyCustomInterval}
          onChange={(e) => setTempCustomInterval(Number(e.target.value))}
          value={tempCustomInterval}
        />
      )}
    </div>
  );
}

export default CaptureIntervalSelector;
