import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const ColorPicker = ({
  label = "Choose Color",
  id = "colorInput",
  value = "#000",
  className = "",
  onChange = () => ({}),
}) => {
  return (
    <div className={className}>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control
        type="color"
        id={id}
        defaultValue={value}
        title="Choose your color"
        onChange={(event) => onChange(event)}
      />
    </div>
  );
};

export default ColorPicker;

ColorPicker.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
