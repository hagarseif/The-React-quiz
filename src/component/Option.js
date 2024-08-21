function Option({ questions, dispatch, answer }) {
  const isAnswerd = answer !== null;
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            isAnswerd ? index === questions.correctOption ? "correct" : "wrong":""
          }`}
          key={option}
          disabled={isAnswerd}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
