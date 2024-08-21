
function Progress({index,numQuestions,maxPoints,points,progress}) {    
    
  return (
    <header className="progress">
        <progress max={numQuestions} value={progress}/>
        <p><strong>Questions</strong> {index+1}/{numQuestions}</p>
        <p><strong>points</strong> {points}/{maxPoints}</p>
    </header>
  )
}

export default Progress