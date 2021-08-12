import PropTypes from "prop-types";
import styles from "./Icon.module.scss";
import icons from "./icons";

const Icon = ({ icon, height, width, fill, onClick }) => {
  const IconComponent = icons[icon];
  return (
    <div className={styles.IconContainer} onClick={onClick}>
      <IconComponent height={height} width={width} fill={fill} />
    </div>
  );
};

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  fill: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  height: 10,
  width: 10,
  fill: "grey",
  onClick: () => ({}),
};

export default Icon;
