import React from "react";

export default function Questions(props){

    function decodeHTML(html) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(html, 'text/html').body.textContent;
        return decodedString;
      }

      const styles = props.alternatives.map(alternative => ({
        backgroundColor: alternative.isSelected ? "#59E391" : "white"
      }));
        
      
     //create onClick button to change selected status
    return(
    <div className="main">
     <h2 className="questionTitle">{props.questionTitle}</h2>
 
     <h4 className="alternatives " style = {styles[0]} onClick={() => props.handleSelectedAlternative(props.alternativeId[0], props.id)}>{decodeHTML(props.alternatives[0].alternative)}</h4>
      <h4 className="alternatives" style = {styles[1]}  onClick={() => props.handleSelectedAlternative(props.alternativeId[1], props.id)}>{decodeHTML(props.alternatives[1].alternative)}</h4>
      <h4 className="alternatives" style = {styles[2]}  onClick={() => props.handleSelectedAlternative(props.alternativeId[2], props.id)}>{decodeHTML(props.alternatives[2].alternative)}</h4>
      <h4 className="alternatives" style = {styles[3]}  onClick={() => props.handleSelectedAlternative(props.alternativeId[3], props.id)}>{decodeHTML(props.alternatives[3].alternative)}</h4>
   
    </div>
    
  )


}