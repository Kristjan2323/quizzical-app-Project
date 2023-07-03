import React from "react";

export default function Questions(props){

  return(
    <div className="main">
     <h2 className="questionTitle">{props.questionTitle}</h2>
     <h4 className="alternatives">{props.alternatives}</h4>
    </div>
  )


}