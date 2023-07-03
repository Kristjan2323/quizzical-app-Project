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
  
    function decodeHTML(html) {
      const parser = new DOMParser();
      const decodedString = parser.parseFromString(html, 'text/html').body.textContent;
      return decodedString;
    }

    function shuffleArray(array) {
      const alternativesArray = []
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        alternativesArray.push(array[i])
      }
      return alternativesArray
    }

  

   function QuestionModel(questionData){

    const randomQuestion = questionData.results.map(result => {
      const allAnswers = [...result.incorrect_answers, result.correct_answer];
    const allAlternativesInArray =  shuffleArray(allAnswers);

      const decodedQuestion = decodeHTML(result.question);
    const decodedIncorrectAnswers = result.incorrect_answers.map(answer => decodeHTML(answer));
    const decodedCorrectAnswer = decodeHTML(result.correct_answer);
    const decodeAllAnswers = decodeHTML(allAnswers)

      return{
        id: nanoid(),
        isSelected : false,
        questionTitle: decodedQuestion,
        wrongAnswers : decodedIncorrectAnswers ,
        rightAnswers :decodedCorrectAnswer,
        allAnswers : allAlternativesInArray
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


