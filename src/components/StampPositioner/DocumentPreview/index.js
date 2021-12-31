import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import styles from "./DocumentPreview.module.scss";
import { DragItemTypes } from "../../../utils/constants";

const DocumentPreview = forwardRef(({ document, handleDrop }, ref) => {
  const { wrapper } = styles;
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: DragItemTypes.STAMP,
      drop: (item, monitor) => {
        const offset = monitor.getSourceClientOffset();
        if (offset) {
          const dropTargetXy = ref.current.getBoundingClientRect();
          handleDrop({
            x: offset.x - dropTargetXy.left,
            y: offset.y - dropTargetXy.top,
          });
        }
      },
      canDrop: () => true,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );
  return (
    <div ref={ref}>
      <img
        src={document}
        className={wrapper}
        ref={drop}
        style={{
          border: isOver ? "1px dashed red" : "none",
        }}
      />
    </div>
  );
});

DocumentPreview.displayName = "DocumentPreview";

export default DocumentPreview;

DocumentPreview.propTypes = {
  document: PropTypes.string,
  // isOver: PropTypes.bool,
  handleDrop: PropTypes.func,
  // customText: PropTypes.string,
  // stampPosition: PropTypes.shape({
  //   x: PropTypes.number,
  //   y: PropTypes.number,
  // }),
};
