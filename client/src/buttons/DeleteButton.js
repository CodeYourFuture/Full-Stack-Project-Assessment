import { React } from "react";
//import Alert from "@mui/material/Alert";
//import Stack from "@mui/material/Stack";

function DeleteButton({ videoID, setURL, order }) {
  //const [alert, setAlert] = useState(false);

  const handleDelete = async (e) => {
    //setAlert(true);
    try {
      //send delete request with video id to the server
      const res = await fetch(`/${videoID}`, {
        method: "DELETE",
      });

      const serverMsg = await res.json();

      console.log(serverMsg);
      setURL(
        `order/?by=${order}&${Math.floor(Math.random() * (1000 - 10 + 1) + 10)}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* {alert ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">This is an info alert — check it out!</Alert>
        </Stack>
      ) : (
        ""
      )} */}
      <button
        onClick={handleDelete}
        className="p-2 mb-1 bg-danger text-white delete-button"
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteButton;
