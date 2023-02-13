import React from "react";

export const Forms = () => {
    return (
        <div>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label col-sm-3">Title</label>
                    <input type="email" className="form-control col-sm-3" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label col-sm-3">URL</label>
                    <input type="url" class="form-control col-sm-3" id="url" />
                </div>
                <div><button type="submit" className="btn btn-primary">Cancel</button>
                    <p> </p>
                    <button type="submit" className="btn btn-primary">Add</button> </div>

            </form>
        </div>
    )
}
