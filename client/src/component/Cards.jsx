import React,{useState} from 'react';

const Cards = ({card,add,setAdd}) => {
    const [like,setLike]= useState(card.rating);
    ;
  

    function handleLike(){
    setLike(()=>{
       return like + 1
    })
    }
    function handleDislike(){
        setLike(()=>{
            return like - 1
         })
    }
    function handleDelete(){
        const filtered=add.filter(item=>item.id !== card.id)
       setAdd(filtered)
    }

    return (
        <div  className="cards">
            <div className="card">
            <h4>{card.title}</h4>
           <iframe
            src={`https://www.youtube.com/embed/${card.url.split("=")[1]}`}
            title={card.url}
             frameborder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
             </iframe>
             <p>{like}</p>
             <div>
             <button onClick={handleLike}>Up Vote</button>
             <button onClick={handleDislike}>Down vote </button>
             </div>
             <button onClick={handleDelete}>Delete</button>
          </div>
            

            
        </div>
    );
}

export default Cards;
