export default function Header({ toggleForm }) {
  return (
    <div className="header">
      <h1 className="nn">My PlayList</h1>
      <button
        onClick={toggleForm}
        className="header-add-btn btn box with-drop-shadow"
      >
        ADD NEW VIDEO
      </button>
    </div>
  );
}
