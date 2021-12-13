import fetchData from "./fetchData";
export default async function updateVote(
  vote,
  id,
  setVoteCount
) {
  const putObject = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ vote }),
  };
  const response = await fetchData(
    `/vote/${id}`,
    putObject
  );
  vote === 1 &&
    response.status === 200 &&
    setVoteCount((prev) => prev + 1);

  vote === -1 &&
    response.status === 200 &&
    setVoteCount((prev) => (prev > 0 ? prev - 1 : 0));
}
