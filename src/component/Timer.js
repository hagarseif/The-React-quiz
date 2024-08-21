import { useEffect } from "react";

function Timer({ dispatch, timeRemaining }) {
  const mins = Math.ceil(timeRemaining / 60);
  const sec = timeRemaining % 60;
  useEffect(function () {
    const id=setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);
    return ()=>clearInterval(id)
  }, [dispatch]);

  return (
    <div>
      <span className="timer">
        {mins < 10 && "0"}
        {mins}:{sec < 10 && "0"}
        {sec}
      </span>
    </div>
  );
}

export default Timer;
