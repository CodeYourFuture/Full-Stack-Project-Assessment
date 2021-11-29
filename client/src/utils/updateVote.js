import fetchData from "./fetchData";
export default async function updateVote(vote, id) {
  const putObject = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(vote),
  };
  const response = await fetchData(`/${id}`, { putObject });
  return response;
}
