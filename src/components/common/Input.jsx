import React from 'react';
import PropTypes from "prop-types";

const Input = ({ label, text, placeholder, type, id, value, handleChange, required}) => (
  <div className="">
    <label htmlFor={label}><b>{text}</b></label>
    <input 
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      required={required}
    />
  </div>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
}
export default Input;