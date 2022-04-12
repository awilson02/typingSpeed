
import randomWords from 'random-words'
import {useState, useEffect} from "react";
import './App.css';
import {render} from "react-dom";

const words_num = 150
const time = 12
function App() {

  const [text, setText] = useState([])
  const [timer, setTimer] = useState([time])
  const [timerClass, setTimerClass] = useState("timerG")
  const [read, setRead] = useState( true)
  const [running, setRun] = useState( false)
  const [incorrect, setIncorrect ] = useState(0)


  const [currWord, setCurrWord] = useState(0);
  const [charInWord, setCharInWord] = useState(-1)
  const [charIn, setCharIn] = useState("")
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
      setRead(false)
      setRun(true)
      setCursor()
      setInterval(() =>
      {
          setTimer((current) =>
          {
              if(current >0)
              {
                  if(current <11)
                  {
                      setTimerClass("timerRS")
                  }
                  else if (current <40)
                  {
                      setTimerClass("timerY")
                  }
                  return current-1;
              }
              else
              {
                  setRead(true)
                  compare();
                  setTimerClass("timerB")
                  clearInterval()
                  setRun(false)
                  return "Finished"
              }

          })
      }, 1000)



  }




  function setCursor()
  {

          document.querySelector("textarea").focus();
          document.querySelector("textarea").setSelectionRange(0,0);

  }

  function inputHandler ({code, key})
  {

      if(code === 8)
      {
          setCharInWord(charIn -1)
          setCharIn("")

      }
      else if (key === " ")
      {

         compare()
         setWordIn("")
         setCurrWord(currWord +1)
         setCharIn( -1)
      }
      else
      {
          setCharInWord(charInWord+1)
          setCharIn(key)
      }


  }
  function compare()
  {
        const word = text[currWord]
        const userWord = wordIn.split(" ");

        if(word === userWord[userWord.length-1])
        {
            setvalid("true")
            setIncorrect(incorrect+1)
        }
        else
        {
            setvalid("false")

        }

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
                        <span className="t">
                         {word}
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
                        <div className="content">
                            {incorrect === 0 &&
                            ("Press Start When Ever Ready")}
                            {incorrect !==0 &&
                            (
                                "Words per min = " + incorrect +wordIn
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
          <button className="startButton" onClick={startTest}>Start</button>

      </div>

    </div>
  );
}

export default App;
