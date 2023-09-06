import React from "react";
import styles from "./CameraControls.module.css";
import Button from "./Button";

function CameraControls({ controls }) {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.controlsWrapper}>
        {controls.map((control, index) => (
          <Button
            key={index}
            onClick={control.onClick}
            title={control.title}
            backgroundColor={control.background}
            isActive={control.isActive}
          >
            <img
              src={control.isActive ? control.iconActive : control.iconInactive}
              alt={control.title}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CameraControls;
