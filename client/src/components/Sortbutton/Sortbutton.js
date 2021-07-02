import  "./SortButton.css";

const SortButton = ({handleSort,sortVideoButton }) => {
    return (
    <div>
     <label>Sort By Rating</label> <button onClick = {handleSort} className="sortBtn">{sortVideoButton }</button>
    </div>
    )
}

export default SortButton;