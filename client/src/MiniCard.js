import "./MiniCard.css";

export const MiniCard = ({ miniCardNumber, miniCardText }) => {
  return (
    <div className="mini-card-wrapper">
      <h2 className="mini-card-number">{miniCardNumber}</h2>
      <p className="mini-card-text">{miniCardText}</p>
    </div>
  );
};
