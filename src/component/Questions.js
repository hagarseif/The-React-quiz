import Option from "./Option";

function Questions({ questions, answer, dispatch, index }) {
  console.log(questions);

  return (
    <div>
      <h3>{questions.question}</h3>
      <Option questions={questions} answer={answer} dispatch={dispatch} />
      {answer !== null ? (
        <button
          className="btn btn-ui"
          disabled={answer === null}
          onClick={() => dispatch({ type: "nextQuestion", payload: index + 1 })}
        >
          Next
        </button>
      ) : (
        null
      )}
    </div>
  );
}

export default Questions;
