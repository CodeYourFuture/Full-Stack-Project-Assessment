import React, {useEffect, useState} from "react";
//import Retrieve from "./fetch.js";

function Retrieve() {
    const[videosData, setVideosData] = useState([]);
    useEffect(() => {
        fetch('/')
        .then(res => {
            if(res.ok){
                res.json();
            }
        }).then(jsonResponse => setVideosData(jsonResponse))
    },[])
    console.log(videosData);
}

export default Retrieve;

// function PokemonMoves() {
//   const [pokemonData, setPokemonData] = useState(null);
//   useEffect(() => {
//     fetch("https://pokeapi.co/api/v2/pokemon/1/")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       setPokemonData(data);
//     });
//   }, []);