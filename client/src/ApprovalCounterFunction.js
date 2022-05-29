import React, { Component , useState , useEvent , useEffect } from "react";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";



export default function ApprovalCounterFunction(props){
    console.log(props.passedRating);
    console.log(props.passedId);

    const [ count , setCount ] = useState(0);
    const [ increaseCount , setIncreaseCount ] = useState(0);
    const [ decreaseCount , setDecreaseCount ] = useState(0);

    const [ currentId , setCurrentId ] = useState(0);

    // This will update the setCount when the props.passedRatings is updated, i.e. when the function loads, and then 
    // when the ratings data is actually available
    useEffect(() => {
        setCount(props.passedRating);
        updateOriginalApprovalCount(props.passedRating);
        // changeColorForCount();
    }, [props.passedRating]);

    // This will update the currentId useState when the props.passedId is updated
    useEffect(() => {
        setCurrentId(props.passedId);
    }, [props.passedId]);

    // Leaving the square brackets will mean that this useEffect will only run once, not continously.
    // These two useEffects will update the setCoount state when either the increaseCount or 
    // decreaseCount states are changed 
    useEffect(()=>{
        setCount(count+1);
        // changeColorForCount();
    },[increaseCount])

    useEffect(()=>{
        setCount(count-1);
        // changeColorForCount();
    },[decreaseCount])

    console.log(count)

    // This will send the updated count to the server
    useEffect(()=>{
        fetch(`http://localhost:5000/${currentId}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            updatedRatings: count
        })
        })
        .then(response => response.json())
        .then(data => {
           console.log(data);
        });
    },[count]);



    // This code checks if the count has changed, and if so will set a useState with the unchanged numbers
    // as well as the changed numbers. This allows me to apply seperate styling to create the color effect
    const [ originalApprovalCount , updateOriginalApprovalCount ] = useState(0);
    const [ unchangedApprovalCounter , updateUnchangedApprovalCounter ] = useState(0);
    const [ changedApprovalCounter , updateChangedApprovalCounter ] = useState();

    var originalNumberArray = String(originalApprovalCount).split("").map((num)=>{
        return Number(num)
    })
    var newNumberArray = String(count).split("").map((num)=>{
        return Number(num)
    })

    let unchangedNums = [];
    let changedNums = [];

    for (let index = 0; index < newNumberArray.length; index++) {
        const originalNum = originalNumberArray[index];
        const newNum = newNumberArray[index];
        if (newNum !== originalNum){
            console.log(newNum)
            changedNums.push(newNum)
        } else {
            unchangedNums.push(originalNum);
        }
        console.log("look below")
        console.log("currentCount : " + count)
        console.log("unChanged : " + unchangedNums)
        console.log("changed   : " + changedNums)
    }

    useEffect(()=>{
        // setCount(count+1);
        // changeColorForCount();
        updateUnchangedApprovalCounter(unchangedNums.join(""))
        updateChangedApprovalCounter(changedNums.join(""));
    },[count])

    

    
    return (
        <div className="approvalBanner">
            <button href="#" class="hbtn hb-border-left-br3 likeButtons" type="button" onClick={()=>{setDecreaseCount(decreaseCount - 1)}}><ion-icon id="likeIcons" name="heart-dislike-outline"></ion-icon></button>
            <h3>VOTES : {unchangedApprovalCounter}<span className="approvalCounterToUpdate">{changedApprovalCounter}</span></h3>
            <button href="#" class="hbtn hb-border-right-br3 likeButtons" type="button" onClick={()=>{setIncreaseCount(increaseCount + 1)}}><ion-icon id="likeIcons" name="heart-half-outline"></ion-icon></button>
        </div>
    )
}


