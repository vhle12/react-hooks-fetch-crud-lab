import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(question => setQuestions(question))
  }, []);

  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions)
  }

  function updateCorrectAnswer(id, newIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        correctIndex: newIndex
      })
    })
    .then(response => response.json())
    .then(() => {
      setQuestions(prevQuestions =>
        prevQuestions.map(question => {
          if (question.id === id) {
            return { ...question, newIndex };
          } else {
            return question;
          }
        })
      );
    })
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onUpdateCorrectAnswer={updateCorrectAnswer}
            onDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
