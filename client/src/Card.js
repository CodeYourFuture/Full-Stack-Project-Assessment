import "./Card.css";

export const Card = ({
  wrapperClass,
  cardSubtitle,
  cardTitle,
  cardTextClass,
  cardText,
  cardLink,
  cardLinkClass,
  cardLinkText,
}) => {
  return (
    <div className={wrapperClass}>
      <p className="card-subtitle">{cardSubtitle}</p>
      <h1 className="card-title">{cardTitle}</h1>
      <p className={cardTextClass}>{cardText}</p>
      <a href={cardLink} className={cardLinkClass}>
        {cardLinkText}
      </a>
    </div>
  );
};
