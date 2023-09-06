async function fetchVideosData(source) {
  const response = await fetch(`${source}`);
  const data = await response.json();
  return data;
}

export default fetchVideosData;
