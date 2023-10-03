import React from "react";

export const FormInput = ({ htmlFor, type, onChange, error, value }) => {
  return (
    <section className="form-input">
      <div className="label-input-container">
        <label htmlFor={htmlFor}>{htmlFor}:</label>
        <input
          type={type}
          id={htmlFor}
          name={htmlFor}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <p>{error}</p>}
    </section>
  );
};
