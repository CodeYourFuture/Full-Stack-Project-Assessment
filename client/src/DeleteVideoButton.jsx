import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DeleteVideobutton = ({ idToDelete, fetchRecommendedVids }) => {
	const [deletionstatus, setdeletionstatus] = useState(null);
	//delete a video using fetch method
	const deleteVideoFetch = async (videoId) => {
		try {
			const response = await fetch(`/api/videos/${videoId}`, {
				method: "DELETE",
			});
			if (response.ok) {
				setdeletionstatus("Deleted!");
				fetchRecommendedVids();
			}
		} catch (error) {
			console.error("Error while deletion: " + error);
		}
	};

	const handleClickDelete = () => {
		deleteVideoFetch(idToDelete);
	};
	return (
		<>
			<FontAwesomeIcon
				icon={faTrashCan}
				onClick={() => handleClickDelete()}
				className="button-icon"
			/>
		</>
	);
};

export default DeleteVideobutton;
