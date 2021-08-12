import PropTypes from "prop-types";
import styles from "./ProgressRing.module.scss";
import React, { useEffect, useState, useRef } from "react";

const ProgressRing = ({
  size,
  progress,
  strokeWidth,
  circleOneStroke,
  circleTwoStroke,
}) => {
  const radius = size / 2 - strokeWidth / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const circleRef = useRef(null);

  const [offset, setOffset] = useState(0);

  const isStrProgress = typeof progress === "string";

  useEffect(() => {
    if (!isStrProgress) {
      const progressOffset = ((100 - progress) / 100) * circumference;
      setOffset(progressOffset);
    }
  }, [setOffset, circumference, progress, offset]);

  return (
    <svg className={styles.svg} width={size} height={size}>
      <circle
        className={styles["svg-circle-bg"]}
        stroke={circleOneStroke}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        ref={circleRef}
        className={styles["svg-circle"]}
        stroke={circleTwoStroke}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDashoffset={offset}
        strokeDasharray={circumference}
      />
      <text className={styles["svg-circle-text"]} x={center} y={center}>
        {progress}
        {isStrProgress ? "" : "%"}
      </text>
    </svg>
  );
};

ProgressRing.propTypes = {
  progress(props, propName) {
    if (!(propName in props)) {
      return new Error(`missing ${propName}`);
    }
    if (typeof props[propName] === "number") {
      if (props[propName] > 100) {
        return new Error(`${propName} can not be greater 100%`);
      }
    }
  },
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  circleOneStroke: PropTypes.string.isRequired,
  circleTwoStroke: PropTypes.string.isRequired,
};

ProgressRing.defaultProps = {
  progress: 0,
  size: 200,
  strokeWidth: 15,
  circleOneStroke: "#7ea9e1",
  circleTwoStroke: "#000",
};

export default ProgressRing;
