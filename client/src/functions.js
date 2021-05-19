/*************** VARIABLES AND CONSTANTS *************/
const URL = `http://localhost:5000`;

/********************** FUNCTIONS *************************/

export function createVideoData(form) {
  return {
    title: form.querySelector("#title").value,
    url: form.querySelector("#url").value,
    dateUploaded: new Date().toLocaleDateString(),
  };
}

export function validateForm(form) {
  const id = form.id;
  const fields = getFormFields(id);
  const errors = getFormErrors(fields);
  return errors.length > 0 ? errors : [];
}

function getFormFields(formId) {
  return [
    ...document.getElementById(formId).querySelectorAll("input"),
  ].map((input) => ({ id: input.id, value: input.value }));
}

function getFormErrors(formData) {
  let errors = checkEmptyFormFields(formData);
  if (errors.length > 0) {
    return errors;
  } else {
    return checkVideoUrlFormat(formData);
  }
}

function checkEmptyFormFields(formData) {
  return formData
    .filter((field) => field.value === "")
    .map((field) => `Error: ${field.id} cannot be empty.`);
}

function checkVideoUrlFormat(formData) {
  const url = formData.find((field) => field.id === "url").value;
  const urlFormat = "https://www.youtube.com/watch?v=";
  return url.includes(urlFormat) && url.length > urlFormat.length
    ? []
    : [`Error: invalid URL. Please enter a valid YouTube video URL.`];
}

// FETCH DATA FROM SERVER
export async function fetchVideosData(param) {
  return await fetch(`${URL}/${param}`).then((res) => res.json());
}

// ADD VIDEO DATA TO SERVER
export async function addVideoToServer(form) {
  const video = createVideoData(form);
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(video),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 201) {
    window.location.reload();
    return alert("Video has been added successfully.");
  }
  response.json().then((error) => alert(error.message));
}

// REMOVE VIDEO DATA FROM SERVER
export async function removeVideoFromServer(videoId) {
  const response = await fetch(`${URL}/${videoId}`, {
    method: "DELETE",
  });
  if (response.status === 204) {
    window.location.reload();
    return alert("Video has been removed successfully.");
  }
  response.json().then((error) => alert(error.message));
}

// UPDATE VIDEO DATA ON SERVER (video rating)
export async function updateVideoRatingOnServer(videoId, numVotes) {
  const response= await fetch(`${URL}/${videoId}`, {
    method: "PUT",
    body: JSON.stringify({ rating: numVotes }),
    headers: { "Content-Type": "application/json" },
  });
  return response.status;
}

// GET SINGLE VIDEO FROM SERVER
export async function fetchSingleVideoData(videoId) {
  const response = await fetch(`${URL}/${videoId}`);
  if (response.status === 200) {
    return await response.json();
  }
}
