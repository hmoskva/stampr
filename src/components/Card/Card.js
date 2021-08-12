import PropTypes from "prop-types";
import styles from "./Card.module.scss";

const Card = (props) => {
  return (
    <div
      className={`${styles.Card} ${props.className}`}
      style={{ backgroundColor: props.backgroundColor }}
    ></div>
  );
};

Card.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
};

export default Card;
