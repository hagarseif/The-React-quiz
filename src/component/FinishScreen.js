
function FinishScreen({points,maxPoints,dispatch}) {
    const percentage=(points/maxPoints)*100;
    let emoji=null;
  return (
    <>
        <p className="result">{points===maxPoints?emoji="🥇":points>maxPoints-100&&points<maxPoints-50? emoji="🎉":"🙃"} You scored {points} out of {maxPoints} ({Math.ceil(percentage)}%)</p>
        <button className="btn restart" onClick={()=>dispatch({type:"restart"})}>Restart Quiz</button>

    </>
  )
}

export default FinishScreen