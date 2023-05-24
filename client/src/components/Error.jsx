function Error({ errorMessage }) {
  return (
    <div className="error-container">
      <img src="./images/error.png" alt="" className="error-image" />
      <h2 className="error-message">{errorMessage.toString()}</h2>
    </div>
  );
}

export default Error;
