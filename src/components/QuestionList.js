import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
      .then((r)=> r.json())
      .then((questions)=>  setQuestions(questions))
  }, [])

// add this callback function
function handleDeleteQuestion(deletedquestion) {
  const updateQuestions = questions.filter((question) => question.id !== deletedquestion.id);
  setQuestions(updateQuestions);
}

// add this callback function
function handleUpdateQuestion(updatedQuestion) {
  const updatedQuestions = questions.map((question) => {
    if (question.id === updatedQuestion.id) {
      return updatedQuestion;
    } else {
      return question;
    }
  });
  setQuestions(updatedQuestions);
}


// you can't map an object unless the state has the same name as the data in the fetch
  const questionsList = questions.map((item) => (
    <QuestionItem
      key={item.id}
      question={item}
      onDeleteQuestion={handleDeleteQuestion}
      onUpdateQuestion={handleUpdateQuestion}
    />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionsList}
        </ul>
    </section>
  );
}

export default QuestionList;
