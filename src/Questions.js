import React from "react";

export default function Questions(props){

    function decodeHTML(html) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(html, 'text/html').body.textContent;
        return decodedString;
      }
      
     
       const styles = props.alternatives.map(alternative => ({
         backgroundColor: alternative.isSelected ? "#c1bcdc" : "white"
       }));

     //
  
     const styles2 = props.alternatives.map((alternative, index) => {
     const questionIndex = props.qestionIndex; // Calculate the question index
   //  const arrayOfIndex = alternative.findIndex()
      const isSelected = alternative.isSelected;
      const isCorrectAlternative = decodeHTML(props.rightAnswers[questionIndex]) === decodeHTML(alternative.alternative);
   //   const isCorrect = props.selectedAlternatives[questionIndex] === props.rightAnswers[questionIndex] === alternative;
      
      const backgroundColor = isCorrectAlternative
        ? isSelected
          ? "#adebad" // Selected and correct: green
          : "#adebad" // Not selected but correct: green
        : isSelected
        ? " #ffb3b3" // Selected but not correct: red
        : "white"; // Not selected and not correct: white
    
   

      return {
        backgroundColor,
      };
    });
        
      
     //create onClick button to change selected status
    return(
    <div className="main">
     <h2 className="questionTitle">{props.questionTitle}</h2>
 
     <h4 className="alternatives " style = {props.isDisabled ? styles2[0]: styles[0]} onClick={props.isDisabled ? undefined :() => props.handleSelectedAlternative(props.alternativeId[0], props.id)}>{decodeHTML(props.alternatives[0].alternative)}</h4>
      <h4 className="alternatives" style = {props.isDisabled ? styles2[1]:styles[1]}  onClick={props.isDisabled ? undefined : () => props.handleSelectedAlternative(props.alternativeId[1], props.id)}>{decodeHTML(props.alternatives[1].alternative)}</h4>
      <h4 className="alternatives" style = {props.isDisabled ? styles2[2]:styles[2]}  onClick={props.isDisabled ? undefined :() => props.handleSelectedAlternative(props.alternativeId[2], props.id)}>{decodeHTML(props.alternatives[2].alternative)}</h4>
      <h4 className="alternatives" style = {props.isDisabled ? styles2[3]:styles[3]}  onClick={props.isDisabled ? undefined :() => props.handleSelectedAlternative(props.alternativeId[3], props.id)}>{decodeHTML(props.alternatives[3].alternative)}</h4>
   
    </div>
    
  )
}