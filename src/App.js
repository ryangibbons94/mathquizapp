import { useEffect, useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

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
    event.target.classList.remove("border-none");
    event.target.classList.add("border-2");
    event.target.classList.add("border-solid");
  }

  function clearBorders() {
    let labelArray = document.querySelectorAll("label");
    labelArray.forEach((x) => x.classList.add("border-none"));
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
    <section className="mx-auto mt-20 p-10 border-2 w-96 font-mono text-white">
      <button className="border-2 mx-auto block" onClick={getQuestion}>
        Question Please
      </button>
      <p>Score: {score}</p>
      <div className="">{question}</div>
      <form>
        {answers.map((x, ind) => {
          return (
            <label
              onClick={handleAnswerChange}
              className="cursor-pointer block"
              key={ind}
              value={x}
            >
              {/* <input
                onChange={clearBorders}
                name="answer"
                type="radio"
                value={x}
                className="radio"
              ></input> */}
              {x}
            </label>
          );
        })}
      </form>
      <button onClick={checkAnswerChoice}>Check answer</button>
    </section>
  );
}

export default App;
