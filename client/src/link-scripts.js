// Get the links and add event listeners
const linksDiv = document.getElementById("links");
const githubLink = linksDiv.querySelector(
  "a[href='https://github.com/softacoder']"
);
const portfolioLink = linksDiv.querySelector(
  "a[href='https://frolicking-tiramisu-6a813b.netlify.app/']"
);
const linkedinLink = linksDiv.querySelector(
  "a[href='https://www.linkedin.com/in/jan-softa-680a79b2/']"
);

githubLink.addEventListener("click", () => {
  // Code to handle GitHub link click
  window.open("https://github.com/softacoder", "_blank");
});

portfolioLink.addEventListener("click", () => {
  // Code to handle Portfolio link click
  window.open("https://frolicking-tiramisu-6a813b.netlify.app/", "_blank");
});

linkedinLink.addEventListener("click", () => {
  // Code to handle LinkedIn link click
  window.open("https://www.linkedin.com/in/jan-softa-680a79b2/", "_blank");
});
