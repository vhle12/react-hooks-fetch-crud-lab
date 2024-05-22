import React from "react";

function QuestionItem({ question, onUpdateCorrectAnswer, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}> 
      {answer}
    </option>
  ));

  function handleCorrectAnswerChange(event) {
    const newIndex = parseInt(event.target.value);
    onUpdateCorrectAnswer(id, newIndex);
  };

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(() => onDeleteQuestion(question))
  }
  
  
  
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
