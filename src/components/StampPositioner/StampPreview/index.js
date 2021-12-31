import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { DragItemTypes } from "../../../utils/constants";
import styles from "./StampPreview.module.scss";

const StampPreview = ({ stamp, customText, stampPosition, width, height }) => {
  const { wrapper, wrapper__text } = styles;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragItemTypes.STAMP,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.2 : 1,
        cursor: "move",
        left: stampPosition.x,
        top: stampPosition.y,
      }}
      className={wrapper}
    >
      <img src={stamp} height={height} width={width} />
      <div className={wrapper__text}>{customText} </div>
    </div>
  );
};

export default StampPreview;

StampPreview.propTypes = {
  stamp: PropTypes.string,
  customText: PropTypes.string,
  stampPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  width: PropTypes.number,
  height: PropTypes.number,
};
