import React from "react";

export const Forms = () => {

    return (
        <div>
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-1 col-form-label">Title</label>
    <div class="col-sm-3">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Enter Title"/>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-1 col-form-label">URL</label>
    <div class="col-sm-3">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Enter URL"/>
    </div>
  </div>        
  <div class="col-auto">
    <button class="btn btn-primary">Clear</button>
    <button type="submit" className="btn btn-primary ml-3">Add</button>
  </div>           
            
        </div>
    )
}
