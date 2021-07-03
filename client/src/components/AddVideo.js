import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function AddVideo(props) {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
    };

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    function handleUrlChange(event) {
        if (event.target.validationMessage) {
            setUrl(event.target.value)
            setError(true)
        } else {
            setUrl(event.target.value)
            setError(false)
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setOpen(false);

        const data = {
            title: title,
            url: url,
        }

        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Encountered Something Unexpected ${response.status} Please Fill All Fields`)
                }
            })
            .then(
                () => {
                    setTitle("");
                    setUrl("");
                    props.video([]);
                },
                error => {
                    console.log(error);
                });

    }
    
    return (
        <div className="dialog-button" >
            <Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>
                ADD VIDEO
            </Button>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Video</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Video title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        id="url"
                        label="Video url"
                        type="url"
                        value={url}
                        error={error}
                        onChange={handleUrlChange}
                        helperText={error && "Please enter a valid URL"}
                        required
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" disabled={title === "" ? true : url === "" ? true : error ? true : false}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddVideo;