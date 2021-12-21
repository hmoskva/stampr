import React, { useRef, useState } from "react";
import styles from "./StampPositioner.module.scss";
import PropTypes from "prop-types";
import Modal from "../Modal";
import { useDrop, useDrag } from "react-dnd";
import { DragItemTypes } from "../../utils/constants";
import Button from "../Button/Button";

const StampPositioner = ({ stamp, doc, show, handleHide, handleSubmit }) => {
  const { base, base__wrapper, base__wrapper__doc, base__wrapper__stamp } =
    styles;

  const [stampPosition, setStampPosition] = useState({ x: 10, y: 10 });
  const [submitting, setSubmitting] = useState(false);
  const docRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragItemTypes.STAMP,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: DragItemTypes.STAMP,
      drop: (item, monitor) => {
        const offset = monitor.getSourceClientOffset();
        if (offset) {
          const dropTargetXy = docRef.current.getBoundingClientRect();
          setStampPosition({
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

  const submit = async () => {
    try {
      setSubmitting(true);
      const resp = await handleSubmit(stampPosition);
      setSubmitting(false);
      handleHide();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      scrollable={false}
      show={show}
      handleHide={handleHide}
      fullscreen
      size="xl"
      title="Position your stamp"
    >
      <div className={base}>
        <Button
          label="Let's Go"
          className="fw-little mb-5 mx-auto"
          disabled={submitting}
          handleClick={submit}
        />
        <div className={base__wrapper}>
          <div ref={docRef}>
            <img
              src={doc}
              className={base__wrapper__doc}
              ref={drop}
              style={{
                border: isOver ? "1px dashed red" : "none",
              }}
            />
          </div>
          <img
            src={stamp}
            className={base__wrapper__stamp}
            ref={drag}
            style={{
              opacity: isDragging ? 0.2 : 1,
              cursor: "move",
              left: stampPosition.x,
              top: stampPosition.y,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default StampPositioner;

StampPositioner.propTypes = {
  stamp: PropTypes.string,
  doc: PropTypes.string,
  show: PropTypes.bool,
  handleHide: PropTypes.func,
  handleSubmit: PropTypes.func,
};
