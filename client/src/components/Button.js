import React from 'react';

const Button = ({ color, text, onClick }) => {
  return (
  <div>
      <button style={{backgroundColor: color}} onClick={onClick} className="btn btn-primary mb-4">{text}</button>
  </div>
  )
};

export default Button;
