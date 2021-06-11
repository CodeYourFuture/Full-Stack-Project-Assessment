const SortButton = (props) => {
    return (
    <div>
     <label>Sort By Rating</label> <button onClick = {props.handleSort} className="btn btn-success sortBtn">{props.sortVideoButton }</button>
    </div>
    )
}

export default SortButton;