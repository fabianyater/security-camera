// CaptureIntervalSelector.jsx

import React, { useState } from "react";
import styles from "./CaptureIntervalSelector.module.css";
import IntervalSelect from "./IntervalSelect";
import CustomIntervalInput from "./CustomIntervalInput";

function CaptureIntervalSelector({ customInterval, onChangeInterval, id }) {
  const [isCustom, setIsCustom] = useState(false);
  const [tempCustomInterval, setTempCustomInterval] = useState(
    customInterval ? customInterval / 1000 : 0
  );

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
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
    id === "automaticCaptures" && (
      <div className={styles.container}>
        <label className={styles.label}>
          Intervalo de captura en segundos:{" "}
        </label>
        <IntervalSelect
          onChange={handleSelectChange}
          value={isCustom ? "custom" : customInterval}
        />
        {isCustom && (
          <CustomIntervalInput
            onApply={handleApplyCustomInterval}
            onChange={(e) => setTempCustomInterval(Number(e.target.value))}
            value={tempCustomInterval}
          />
        )}
      </div>
    )
  );
}

export default CaptureIntervalSelector;
