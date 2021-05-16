export function getFormData(form) {
  return {
    title: form.querySelector("#title").value,
    url: form.querySelector("#url").value,
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
