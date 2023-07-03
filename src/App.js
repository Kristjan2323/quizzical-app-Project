import logo from './logo.svg';
import './App.css';
import Questions from './Questions'
import React from "react"
import { nanoid } from 'nanoid'


export default function App() {
  const [questions,setQuestion] = React.useState([])

  

    React.useEffect(() => {
      GetQuestionData();
    }, []);
  
    // Rest of your component code...
  
    React.useEffect(() => {
      console.log(questions); // Log the updated value of questions
    }, [questions]);
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }



   function QuestionModel(questionData){

    const randomQuestion = questionData.results.map(result => {
      const allAnswers = [...result.incorrect_answers, result.correct_answer];
      shuffleArray(allAnswers);
      return{
        id: nanoid(),
        questionTitle: result.question,
        wrongAnswers : result.incorrect_answers ,
        rightAnswers : result.correct_answer,
        allAnswers : allAnswers
      };
    
    });
   
   return randomQuestion
   
   }
  

    
   function GetQuestionData(){
   
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    .then(response => response.json())
    .then(data => {
      const questionModel = QuestionModel(data);
     setQuestion(questionModel)
      
    })
   }

  const questionElement = questions?.map(question => (
    <Questions key = {question.id} questionTitle= {question.questionTitle}  alternatives = {question.allAnswers} />
  ))

  return (
    <div className="App">
   
  { questionElement}
  

    </div>
  );
}


