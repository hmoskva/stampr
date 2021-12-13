import React from "react";
import styles from "./BaseText.module.scss";
import concatClasses from "utils/concatClasses";
import PropTypes from "prop-types";

const BaseText = ({
  className,
  color,
  weight,
  fontSize,
  style,
  As = (props) => <p {...props} />,
  ...props
}) => {
  const { baseTextClass } = styles;

  return (
    <As
      {...props}
      className={concatClasses(baseTextClass, className || "")}
      style={{
        ...{ color, fontWeight: weight, fontSize, ...style },
      }}
    />
  );
};

export default BaseText;

BaseText.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
  fontSize: PropTypes.string,
  style: PropTypes.object,
  As: PropTypes.element,
};
