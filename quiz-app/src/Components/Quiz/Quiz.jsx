import "./Quiz.css";
import { data } from "../../assets/data";
import { useRef, useState } from "react";

function Quiz() {
  let [index, setIndex] = useState(0);
  let [question,setQuestion] = useState(data[index])
  let [lock,setLock] = useState(false)
  let [score,setScore] = useState(0)
  let [result,setResult] = useState(false)

  let Option1 = useRef(null)
  let Option2 = useRef(null)
  let Option3 = useRef(null)
  let Option4 = useRef(null)

  let array_List = [Option1,Option2,Option3,Option4]

function CheckAns(e,ans){
    if(lock === false){ 
      if(question.ans === ans){
        e.target.classList.add("correct")
        setScore(prev=>prev+1)
        setLock(true)
    }
    else{
        e.target.classList.add("wrong")
        setLock(true)
        array_List[question.ans-1].current.classList.add("correct")
    }
  }
}

  function Next(){
    if(lock === true){
      if(index === data.length-1){
        setResult(true)
        return
      }

      setIndex(prev => {
        const newIndex = prev + 1
        setQuestion(data[newIndex])
        return newIndex
      })
      setLock(false)
      array_List.map((option)=>{
        option.current.classList.remove("wrong")
        option.current.classList.remove("correct")
        return null
      })
    }
  }

  function handleReset(){
    setQuestion(data[0])
    setResult(false)
    setIndex(0)
    setScore(0)
    setLock(false)
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? <>
        <h2>You Scored {score} out of {data.length} questions</h2>
        <button onClick={handleReset}>Reset</button>
      </>:
      <>
      <h2>{index+1}. {question.question}</h2>
        <ul>
          <li ref={Option1} onClick={(e)=>{CheckAns(e,1)}}>{question.option1}</li>
          <li ref={Option2} onClick={(e)=>{CheckAns(e,2)}}>{question.option2}</li>
          <li ref={Option3} onClick={(e)=>{CheckAns(e,3)}}>{question.option3}</li>
          <li ref={Option4} onClick={(e)=>{CheckAns(e,4)}}>{question.option4}</li>
        </ul>
      <button onClick={Next}>Next</button>
      <div className="index">{index+1} of {data.length} questions</div>
      </>}
    </div>
  );
}
export default Quiz;


