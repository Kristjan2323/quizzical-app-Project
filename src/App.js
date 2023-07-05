import logo from './logo.svg';
import './App.css';
import Questions from './Questions'
import React from "react"
import { nanoid } from 'nanoid'


export default function App() {
  const [questions,setQuestion] = React.useState([])
  const [allQuestionsAreChecked, setAllQuestionChecked] = React.useState(false)
  const [quizzSatistics, setQuizzSatistics] = React.useState("");
  

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

     const addIdForEachAlternative = allAlternativesInArray.map((alternative) =>{
     return{
      id: nanoid(),
      isSelected : false,
      alternative : alternative
     }
  

     });
      return{
        id: nanoid(),     
        questionTitle: decodedQuestion,
        wrongAnswers : decodedIncorrectAnswers ,
        rightAnswers :decodedCorrectAnswer,
        allAnswers : addIdForEachAlternative
      };
     });
   
   return randomQuestion
   
   }
  
   function handleSelectedAlternative(selectedAlternativeId,questionId) {
    setQuestion((questions) =>
      questions?.map((question) => {
        return {
          ...question,
           
          allAnswers: question.allAnswers?.map((alternative) => {
           
            if(question.id === questionId && alternative.id !== selectedAlternativeId){
              return { ...alternative, isSelected:false};
            }
            if (alternative.id === selectedAlternativeId) {

              return { ...alternative, isSelected: !alternative.isSelected };

            }
           
           return alternative;
          })
        };
      })
    );
  }
    
   function GetQuestionData(){
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    .then(response => response.json())
    .then(data => {
      const questionModel = QuestionModel(data);
     setQuestion(questionModel)
      
    })
   }
   function getAllSelectedAlternatives(){
    const selectedAlternatives = questions.map(question =>
      question.allAnswers.filter(alternative => alternative.isSelected ===true)

    )
    const onlyAlternative = selectedAlternatives?.map(selectedAlternative =>
      selectedAlternative.alternative )
    console.log(selectedAlternatives)
    return selectedAlternatives
   }
   
   function getAllRightAnswersFromQuestions(){
    const rightAnswers = questions?.map(question =>
      question.rightAnswers
    )
    console.log(rightAnswers)
    return rightAnswers
   }
   //button click
   function handleAnswers(){
    const check = checkIfAllAlternativesAreAllSelected();
    getAllRightAnswersFromQuestions();
    if(check === true){
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      const selectedAlternatives =  getAllSelectedAlternatives();
      const rightAnswers = getAllRightAnswersFromQuestions();
      for(let i = 0 ; i<rightAnswers.length; i++){
        const see = selectedAlternatives[i].alternative
        const see2 = rightAnswers[i]
          if(selectedAlternatives[i][0].alternative ===rightAnswers[i] ){
            correctAnswers += 1
          }
          else{
            incorrectAnswers += 1
          }
      }
      let correctAnswersSt = correctAnswers.toString();
      let incorrectAnswersSt = incorrectAnswers.toString();
      const quizzReport = correctAnswersSt + "/" + "5"
      setQuizzSatistics(quizzReport)
      setAllQuestionChecked(true)
    }
    else{
      setAllQuestionChecked(false)
    }
   }

   function checkIfAllAlternativesAreAllSelected(){
   const selectedAlternatives =  getAllSelectedAlternatives();
   let allSelected = true;
     for(let i = 0; i<selectedAlternatives.length;i++ ){
      if(selectedAlternatives[i].length === 0){
        allSelected = false
      }
     }
     console.log(allSelected)
     return allSelected
   }

  const questionElement = questions?.map(question => (
    <Questions key = {nanoid()} id = {question.id} alternativeId= {question.allAnswers?.map(alternative =>(alternative.id))} 
     questionTitle= {question.questionTitle}  
    alternatives = {question.allAnswers} isSelected ={question.allAnswers?.map(alternative =>(alternative.isSelected))} 
     handleSelectedAlternative = {(alternativeIdParameter,questionId) => handleSelectedAlternative(alternativeIdParameter,questionId)}
     />
    
  ))


  return (
    <div className="App">
   
  { questionElement}
  
  <span >
    <h3 className='validationAlternativesChecked'>
      {allQuestionsAreChecked && quizzSatistics  }</h3>
    <button className="btnCheckAnswers" onClick={handleAnswers} type="button" >Check Answers</button>
    </span>
    </div>
  );
}


