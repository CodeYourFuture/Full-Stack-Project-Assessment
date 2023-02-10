const AddVideoHeader = ({ setDisplayForm }) => {
  return (
    <div className="form-wrapper">
      <h2 onClick={() => setDisplayForm(true)}>Add Video</h2>
    </div>
  );
};


export default AddVideoHeader;;