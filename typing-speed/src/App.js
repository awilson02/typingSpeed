
import randomWords from 'random-words'
import {useState, useEffect} from "react";
import './App.css';
import {render} from "react-dom";

const words_num = 150
const time = 60
function App() {

  const [text, setText] = useState([])
  const [timer, setTimer] = useState([time])
  const [timerClass, setTimerClass] = useState("timerB")
  const [read, setRead] = useState( true)
  const [running, setRun] = useState( false)
  const [correct, setCorrect ] = useState(Array(150))
  const [finished, setFinished] = useState(false)
  const [correctNum, setCorrectNum] = useState(0)


  const [currWord, setCurrWord] = useState(0);
  const [charInWord, setCharInWord] = useState(0)

  const [wordIn, setWordIn] = useState("")


  const [valid, setvalid] = useState("unknown")


  function textGenerator ()
  {
      return new Array(words_num).fill(null).map(() => randomWords())
  }

  useEffect(() =>
  {
    setText(textGenerator())
  }, [])


  function startTest()
  {
      if(finished)
      {
          setTimer(60)
          setFinished(false)
          setCorrect(0)
          setWordIn("")

          setCharInWord(0)
          setCurrWord(0)
          setText(textGenerator())
          document.querySelector("textarea").value=""
          return;
      }
      else {
          setRead(false)
          setRun(true)
          setCursor()
          const interval = setInterval(() => {
              setTimer((current) => {
                  if (current > 0) {
                      if (current < 11) {
                          setTimerClass("timerRS")
                      } else if (current < 40) {
                          setTimerClass("timerY")
                      }
                      return current - 1;
                  } else {
                      setRead(true)

                      setTimerClass("timerB")
                      clearInterval(interval)
                      setCorrectNum(wordPerMin())
                      setRun(false)
                      setFinished(true)

                      return "Finished"
                  }

              })
          }, 1000)
      }



  }




  function setCursor()
  {

          document.querySelector("textarea").focus();
          document.querySelector("textarea").setSelectionRange(0,0);

  }

  function inputHandler ({keyCode, key})
  {
      let userWord = wordIn.split(" ");

      if(keyCode === 8)
      {

          if(charInWord <= 0)
          {

              setCharInWord(userWord[currWord-1].length -1)
              setCurrWord(currWord-1)
          }
          else
          {

              setCharInWord(charInWord -1)
          }


      }
      else if (keyCode === 32)
      {



         setCurrWord(currWord +1)

         setCharInWord(0)
      }
      else
      {
          setCharInWord(charInWord+1)

      }


  }



  function charCompare( wordI, char,charI)
  {
      const userWord = wordIn.split(" ");

      if(wordI == currWord && charI == charInWord){
          return"greenChar"
      }
      else if( wordI < currWord)
      {
          if(text[wordI] === userWord[wordI])
          {
              correct[wordI] = 1;
              return "blueChar"
          }
          else
          {
              correct[wordI] = 0;
              return "redChar"
          }
      }
      else if(wordI == currWord && charI < charInWord )
      {
          if(userWord[wordI][charI] === text[wordI][charI])
          {
              return"blueChar"
          }
          else
          {
              return "redChar"
          }
      }

  }


  function wordPerMin()
  {
      let count = 0;
      for( let i = 0; i < correct.length; i++)
      {
          if(correct[i])
          {
              count++;
          }
      }
      return  count;
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>Typing Speed Test </h1>
          <h2 className={timerClass}>{timer}</h2>
      </header>
        {running  && (
        <div className="container">
            <div className="content">
                {text.map((word, i) => (
                    <>
                        <span>
                         {word.split("").map((char, iChar) =>
                             (
                                 <span className={charCompare(i, char, iChar)}>{char}</span>
                             ) )}
                       </span>
                       <span> </span>
                    </>

                ))}
            </div>


        </div>
        )
        }
        {!running && (
            <div className="container">
            {finished && (

                    <div className="content">
                {text.map((word, i) => (
                    <>
                        <span>
                         {word.split("").map((char, iChar) =>
                            (
                                 <span className={charCompare(i, char, iChar)}>{char}</span>
                            ) )}
                        </span>
                        <span> </span>
                    </>

            ))}
            </div>)}

                        <div className="content">
                            { correctNum === 0 &&
                            ("Press Start When Ever Ready")}
                            { correctNum !==0 &&
                            (
                                "Words per min = " + correctNum + " Accuracy = "
                                + Math.round((correctNum/currWord)*10000)/100 + "%"
                            )}
                        </div>
                    </div>

        )}
        <div className="userInActive">
           <form>
               <textarea spellCheck={"false"} readOnly={read} onKeyDown={inputHandler} onChange={(e) => setWordIn(e.target.value)}>

               </textarea>
           </form>


        </div>

      <div className="section">
          <button className="startButton" id="button" onClick={startTest}>Start</button>

      </div>

    </div>
  );
}

export default App;
