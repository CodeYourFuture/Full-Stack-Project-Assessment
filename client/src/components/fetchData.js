const FetchData = async (endpoint = "") => {
  try {
    const res = await fetch(`http://localhost:5000/${endpoint}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default FetchData;
