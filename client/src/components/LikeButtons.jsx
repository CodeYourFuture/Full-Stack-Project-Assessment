import React from "react"



function LikeButtons({votes, updateRating, videoId}){
    // useState
  // const [like, setLike] = useState(votes);
  // // add order quantity handler
  // function oneLike() {
  //   return setLike((add) => add + 1);
  // }
  // // remove order quantity handler
  // function oneDislike() {
  //   return setLike((remove) => (remove > 0 ? remove - 1 : 0));
  // }

    return (
        <div className="likesDiv p-2">
            <button type="button" class="btn btn-success col-3" onClick={(e) => updateRating(e,videoId , 1)}>Like</button>
            <p className="text-info"> <b className="text-danger">{votes} </b>Votes </p>
            <button type="button" class="btn btn-danger col-3" onClick={(e) => updateRating(e, videoId, -1 )}>Dislike</button>
        </div>
    )
}
export default LikeButtons;
