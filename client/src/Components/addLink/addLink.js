import React, { useState } from "react";
const AddLink = ({ setData }) => {
  const [inputFromLink, setInputFromLink] = useState({ title: "", url: "" });
  const [validateInput, setValidateInput] = useState();

  function matchYoutubeUrl(url) {
    const regex =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(regex)) {
      setValidateInput("");
      setData((v) => [
        ...v,
        { ...inputFromLink, id: v[v.length - 1]["id"] + 1, date: new Date() },
      ]);
      return;
    }
    setValidateInput("Invalid youtube url");
  }

  return (
    <div>
      <input
        type="text"
        onChange={(e) =>
          setInputFromLink((v) => {
            return { ...v, title: e.target.value };
          })
        }
      ></input>
      <input
        type="text"
        onChange={(e) =>
          setInputFromLink((v) => {
            return { ...v, url: e.target.value };
          })
        }
      ></input>
      {validateInput}
      <button
        onClick={() => {
          matchYoutubeUrl(inputFromLink.url);
        }}
      >
        Add link
      </button>
    </div>
  );
};

export default AddLink;
