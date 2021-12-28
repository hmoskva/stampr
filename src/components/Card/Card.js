import PropTypes from "prop-types";
import styles from "./Card.module.scss";

const Card = (props) => {
  return (
    <div
      className={`${styles.Card} ${props.className}`}
      style={{ backgroundColor: props.bgColor }}
    >
      {props.children}
    </div>
  );
};

Card.propTypes = {
  bgColor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Card;
