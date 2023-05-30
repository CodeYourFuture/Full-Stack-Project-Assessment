import React from "react";
import "./Form.css";

function Form() {
    return(
        <div className="addvideo flex">
        <a href="#">Add Videos</a>
        <div id="form">
          <form action="#" method="get">
            <label htmlFor="title">Title:</label>
            <input type="text" id="ftitle" name="title" /><br />
            <label htmlFor="url">URL</label>
            <input type="text" id="url" name="url" /><br />
            <input type="submit" value="Cancel" />
            <input type="submit" value="Add"/>
          </form>
        </div>
  
      </div>
    );
}

export default Form;
