import React from 'react';

function EmbedVid({data}) {

  const embUrl = data.map((obj) => obj.url.replace("watch?v=", "embed/"));
  // const embeddedArray = data.map((object) => {
  //   if(object.key === url) return { ...object, key: embUrl };
  // })
  console.log(embUrl)

  return (
    <div>
        <iframe
          key = {data.id}
          title = {data.title}
          height={"300"}
          src={embUrl}
          alt={`video ${data.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
        />
    </div>
  );
}

export default EmbedVid