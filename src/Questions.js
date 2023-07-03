import React from "react";

export default function Questions(props){

    function decodeHTML(html) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(html, 'text/html').body.textContent;
        return decodedString;
      }
     //create onClick button to change selected status
    return(
    <div className="main">
     <h2 className="questionTitle">{props.questionTitle}</h2>
 
     <h4 className="alternatives ">{decodeHTML(props.alternatives[0])}</h4>
     <h4 className="alternatives">{decodeHTML(props.alternatives[1])}</h4>
     <h4 className="alternatives">{decodeHTML(props.alternatives[2])}</h4>
     <h4 className="alternatives">{decodeHTML(props.alternatives[3])}</h4>
    </div>
  )


}