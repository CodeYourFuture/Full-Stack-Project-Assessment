import React from "react";
import Vote from "./Vote";
import Removebtn from "./Removebtn";

let list = [
    {
        "id": 523523,
        "title": "Never Gonna Give You Up",
        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "rating": 23
    },
    {
        "id": 523427,
        "title": "The Coding Train",
        "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
        "rating": 230
    },
    {
        "id": 82653,
        "title": "Mac & Cheese | Basics with Babish",
        "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
        "rating": 2111
    },
    {
        "id": 858566,
        "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
        "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
        "rating": 11
    },
    {
        "id": 453538,
        "title": "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
        "url": "https://www.youtube.com/watch?v=4As0e4de-rI",
        "rating": 3211
    },
    {
        "id": 283634,
        "title": "Learn Unity - Beginner's Game Development Course",
        "url": "https://www.youtube.com/watch?v=gB1F9G0JXOo",
        "rating": 211
    },
    {
        "id": 562824,
        "title": "Cracking Enigma in 2021 - Computerphile",
        "url": "https://www.youtube.com/watch?v=RzWB5jL5RX0",
        "rating": 111
    },
    {
        "id": 442452,
        "title": "Coding Adventure: Chess AI",
        "url": "https://www.youtube.com/watch?v=U4ogK0MIzqk",
        "rating": 671
    },
    {
        "id": 536363,
        "title": "Coding Adventure: Ant and Slime Simulations",
        "url": "https://www.youtube.com/watch?v=X-iSQQgOd1A",
        "rating": 76
    },
    {
        "id": 323445,
        "title": "Why the Tour de France is so brutal",
        "url": "https://www.youtube.com/watch?v=ZacOS8NBK6U",
        "rating": 73
    }
]


function Videos() {

    return (
        
      <div>
          <ul className="video-ul-wrapper">
            {list.map((e, index) => {

            // let test = e.url.substring(32); // works to concatenate with the link after embed/
            // console.log(`https://www.youtube.com/embed/${e.url.substring(32)}`); testing

             return (
               <div className="video-wrapper">
                 <li key={index}>
                         <div>
                             <p>{e.title}</p>
                             {/* <h4>Title: {e.title}</h4> */}
                         </div>
                   <Vote />
                    <iframe
                    width="560" height="315"
                     src={`https://www.youtube.com/embed/${e.url.substring(32)}`}
                     frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowfullscreen
                     title="video"/>
                    
                    <Removebtn />
                         
                 </li>
               </div>
             );
            })}
          </ul>
      </div>
    );
}

export default Videos;