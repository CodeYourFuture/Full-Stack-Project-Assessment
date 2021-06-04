const SortButton = (props) => {
    return <button onClick = {props.handleSort} className="btn btn-success sortBtn">{props.sortVideoButton }</button>
}

export default SortButton;