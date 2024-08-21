import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StrartScreen from "./strartScreen";
import Questions from "./Questions";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const SecForQuestion = 30;
const initialState = {
  questions: [],
  // "loading" , "error" ,"ready" ,"active" ,"finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  progress: 0,
  timeRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" ,timeRemaining: state.questions.length * SecForQuestion};
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
        progress:
          action.payload === currentQuestion.correctOption
            ? state.progress + 1
            : state.progress,
      };
    case "nextQuestion":
      return {
        ...state,
        index: action.payload,
        answer: null,
        status: action.payload >=14?"finish":state.status
      };
    case "tick":
      return {
        ...state,
        status: state.timeRemaining === 0 ? "finish" : state.status,
        timeRemaining: state.timeRemaining - 1,
      };

    case "finishQuiz":
      return { ...state, status: "finish" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    default:
      throw new Error("unknown type");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, progress, timeRemaining } =
    state;
  ///questions length
  const numQuestions = questions.length;
  ///max points
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StrartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              points={points}
              answer={answer}
              questions={questions}
              progress={progress}
            />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
            />
            <Timer timeRemaining={timeRemaining} dispatch={dispatch} />
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            maxPoints={maxPoints}
            points={points}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
