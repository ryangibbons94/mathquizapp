import { useEffect, useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  async function getQuestion() {
    await fetch("https://firstserverrg.herokuapp.com/api/random")
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question);
        setAnswers(shuffle(data.answers));
        setCorrectAnswer(data.correctAnswer);
        console.log(data);
      });

    let arr = document.querySelectorAll("label");
    arr.forEach((x) => {
      x.classList.remove("text-green-600");
      x.classList.remove("text-red-600");
    });
    let radioArray = document.querySelectorAll(".radio");
    radioArray.forEach((x) => (x.checked = false));
  }

  function handleAnswerChange(event) {
    setSelectedAnswer(event.target.innerText);
    clearBorders();
    // event.target.classList.remove("border-white");
    event.target.classList.add("bg-[#080534]");
    event.target.classList.add("border");
    event.target.classList.remove("bg-[#59BFF5]");
    event.target.classList.add("text-white");
    event.target.classList.remove("text-black");
  }

  function clearBorders() {
    let labelArray = document.querySelectorAll(".answer");
    labelArray.forEach((x) => x.classList.add("bg-[#59BFF5]"));
    labelArray.forEach((x) => x.classList.remove("bg-[#080534]"));
    labelArray.forEach((x) => x.classList.remove("border"));
    labelArray.forEach((x) => x.classList.remove("text-white"));
  }

  function checkAnswerChoice() {
    if (selectedAnswer) {
      let newScore;
      //alert(selectedAnswer == correctAnswer);
      if (selectedAnswer == correctAnswer) {
        newScore = score + 1;
      } else {
        newScore = score - 1;
      }
      setScore(newScore);
      getQuestion();
      clearBorders();
      setSelectedAnswer("");
    } else {
      alert("You need to select an answer first.");
    }
  }

  async function startGame() {
    setGameStarted(true);
    await getQuestion();
  }
  function resetScore() {
    setScore(0);
  }
  function skipQuestion() {
    getQuestion();
    clearBorders();
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <section className="rounded mx-auto mt-20 mb-20 p-10 w-[35rem] font-mono text-white h-[40rem] bg-[#181561]">
      {!gameStarted ? (
        <button
          className="hover:text-black text-white bg-[#4f4d8e] hover:bg-[#59BFF5] mx-auto block text-4xl p-12 mt-[45%]"
          onClick={startGame}
        >
          Start
        </button>
      ) : (
        <section>
          <p className="text-center text-3xl mb-6">Score: {score}</p>
          <button
            className=" mx-auto block p-2 px-4 mb-6 hover:text-black text-white bg-[#4f4d8e] hover:bg-[#59BFF5] text-xl"
            onClick={resetScore}
          >
            Reset Score
          </button>
          <div className=" text-center text-xl">{question}</div>
          <form className="flex flex-wrap  my-4 mt-0 pt-6 pb-2 text-black">
            {answers.map((x, ind) => {
              return (
                <div
                  className="block  w-1/2 text-center p-1 pt-0 my-4 "
                  key={ind}
                  value={x}
                >
                  <span
                    onClick={handleAnswerChange}
                    className="cursor-pointer  p-3 px-8 answer rounded w-full block text-md bg-[#59BFF5] hover:bg-[#080534] hover:text-white"
                  >
                    {x}
                  </span>
                </div>
              );
            })}
          </form>
          <button
            className="mx-auto w-full block p-2 px-4 mb-6 hover:text-black text-white bg-[#4f4d8e] hover:bg-[#59BFF5] text-xl rounded"
            onClick={checkAnswerChoice}
          >
            Submit
          </button>
          <button
            className="font-center text-gray-300 block mx-auto border-b hover:text-white hover:border-white border-gray-300 text-lg"
            onClick={skipQuestion}
          >
            Skip Question
          </button>
        </section>
      )}
    </section>
  );
}

export default App;
