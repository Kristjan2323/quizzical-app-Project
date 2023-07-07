import React from 'react'

export default function QuizzWelcome(props){
     
    return(
       <div className='mainPage'>
        <h2 className='quizzicalTitle'>Quizzical</h2>
          <p className='quizDescription'>Decsription: Quizzical represent a set with 5 question, select one alternative for each question.</p>
          <button className='btnStartQuizz' onClick={props.handleQuizzStart}>Start quiz</button>
       </div>
    )
}