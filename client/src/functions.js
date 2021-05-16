export function createVideoData(form) {
  return {
    title: form.querySelector("#title").value,
    url: form.querySelector("#url").value,
    rating: 0,
    dateUploaded:new Date().toLocaleDateString(),
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

export function sortVideosByRating(videos) {
  return videos.sort((video1, video2) => {
    if (video1.rating < video2.rating) {
      return 1;
    } else if (video1.rating > video2.rating) {
      return -1;
    } else {
      return 0;
    }
  });
}
