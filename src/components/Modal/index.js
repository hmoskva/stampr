import { Modal as BootstrapModal } from "react-bootstrap";
import styles from "./Modal.module.scss";
import PropTypes from "prop-types";
import concatClasses from "../../utils/concatClasses";

const Modal = ({
  scrollable = true,
  show = false,
  handleHide,
  fullscreen,
  customClass = "",
  size = "sm",
  title = "",
  children,
}) => {
  const {
    fullScreenModal,
    fullScreenModal__content,
    modalHeader,
    modalHeader__title,
  } = styles;

  return (
    <div className={styles.modalContainer}>
      <BootstrapModal
        show={show}
        animation={true}
        backdrop={true}
        onHide={handleHide}
        aria-labelledby="custom-modal"
        dialogClassName={concatClasses(
          fullscreen ? fullScreenModal : "",
          customClass
        )}
        centered={true}
        contentClassName={fullscreen ? fullScreenModal__content : ""}
        scrollable={scrollable}
        size={size}
      >
        <BootstrapModal.Header className={modalHeader} closeButton>
          <div className="d-flex justify-content-center w-100 flex-column flex-md-row">
            <BootstrapModal.Title className={modalHeader__title}>
              {title}
            </BootstrapModal.Title>
            {/* {props.headerActions} */}
          </div>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{children}</BootstrapModal.Body>
      </BootstrapModal>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  scrollable: PropTypes.bool,
  show: PropTypes.bool,
  fullscreen: PropTypes.bool,
  customClass: PropTypes.string,
  handleHide: PropTypes.func,
  size: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.element,
};
