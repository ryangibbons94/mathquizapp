# Math Quiz App
A full stack web application that serves a randomized math question from an API I built with Node.js and Express. The front end is made using React and TailwindCSS.

**Link to project:** https://math-quizz-app.netlify.app/

**Link to API used:** https://github.com/ryangibbons94/math-api

![screenshot of website](https://ryangibbons.netlify.app/assets/images/mathapp.gif)

## How It's Made:

**Tech used:** Node.js, Express, React, TailwindCSS

## Optimizations
If I had time I would add localstorage for the scorekeeping and on initial page load present the user with two choices, either continue with their previous score or restart. I would also refactor the react code to put each component in its own file and importing it into the main App file.

## Challenges Faced/Lessons Learned:

1. Adding a fading element that showed when points were gained or lost.

So I knew that I wanted to have some sort of dynamic change to the score after each question was answered to highlight that the score had gone up or down. I had spent a morning searching for how to make this happen and settled on [this codepen](https://codepen.io/ianaya89/pen/qEqWWB) for doing the thing I wanted to do. I combined the fadeIn and fadeOut functions from this CodePen and used a setTimeOut function to make the points appear briefly and then fade out. 

2. Adding and removing styles to show a user which answer choice they have selected. 
