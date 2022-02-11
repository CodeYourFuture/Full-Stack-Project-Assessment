import React, { useState, useEffect } from "react";
import "./addModal.css";

function AddModal(props) {
    const { onSave, refresh, errorMessage } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        setIsOpen(false);
        setUrl("");
        setTitle("");
    }, [refresh])

    return (
        <div className={`add-modal ${isOpen ? "add-modal--open" : "add-modal--close"}`}>
            <button className="add-modal__toggle" onClick={() => { setIsOpen(!isOpen) }}>
                {isOpen ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
            </button>
            <form className="add-modal__form">
                <div className="field-wrapper">
                    <label >Title:</label>
                    <input type="text" id="title" name="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div className="field-wrapper">
                    <label >URL:</label>
                    <input type="text" id="url" name="url" value={url} onChange={(e) => { setUrl(e.target.value) }} />
                </div>
                {errorMessage && <p className="add-modal__error" >{errorMessage}</p>}
                <button type="submit" onClick={(e) => {
                    e.preventDefault()
                    onSave({ title, url })
                }}>Save</button>
            </form>
        </div>
    )
}

export default AddModal;