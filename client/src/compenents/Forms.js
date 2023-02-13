import React from "react";

export const Forms = () => {
    return (
        <div>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label col-sm-3">Email address</label>
                    <input type="email" className="form-control col-sm-3" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label col-sm-3">Password</label>
                    <input type="password" class="form-control col-sm-3" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
