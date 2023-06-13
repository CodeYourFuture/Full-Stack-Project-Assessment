import { AppContext } from "../App";
import { useState, useContext } from "react";

export default function Register() {
    const apiURL = useContext(AppContext);

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>
                    Title
                    <br />
                    <input id="title" type="text" name="title" value={input.title} onChange={handleChange} required />
                </label>
            </div>

            <div>
                <label>
                    Url
                    <br />
                    <input id="url" type="text" name="url" value={input.url} onChange={handleChange} required />
                </label>
            </div>

            <div>
                <button className="btn-submit" type="submit">Add</button>
            </div>
        </form>
    );
}