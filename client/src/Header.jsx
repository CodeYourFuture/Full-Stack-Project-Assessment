export default function Header({ toggleForm }) {
  return (
    <div className="header">
      <h1 className="nn">MyPlayList</h1>
      <button onClick={toggleForm} className="header-add-btn btn box ">
        ADD NEW VIDEO
      </button>
    </div>
  );
}
