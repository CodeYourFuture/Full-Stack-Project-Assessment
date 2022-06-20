/*
// This program will read exampleresponse.json and convert it into the format for 
the basis of a 'database' to be used as a BACK END

The format currently is
[
  {
    "id": 523523,
    "title": "Never Gonna Give You Up",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "rating": 23
  },

  I will make the 'id' a 8 character string and include a timestamp to denote when each record was 'created'


  Will use the 'fs' library

*/

let fs = require("fs");
let sourceList = require("./exampleresponse.json");

sourceList = sourceList.map((element) => {
  let theId = element.id + ""; // make it a string
  theId = theId.padStart(8, "0");
  return { ...element, id: theId, timestamp: Date.now() };
});

/* EG
  {
    id: '00442452',
    title: 'Coding Adventure: Chess AI',
    url: 'https://www.youtube.com/watch?v=U4ogK0MIzqk',
    rating: 671,
    timestamp: 1655481073733
    
  },
*/
console.log(sourceList);

fs.open("database.json", "w", function (err, file) {
  if (err) throw err;
});

fs.writeFile("database.json", JSON.stringify(sourceList), function (err, file) {
  if (err) throw err;
});
