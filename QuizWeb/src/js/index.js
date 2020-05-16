const xhr = new XMLHttpRequest();
let response;
xhr.open('GET', 'https://localhost:5001/questions/');
xhr.responseType = 'json';
xhr.onload = () => {
  response = xhr.response;
  questionsBank = response;
};
xhr.send();

let questionsBank;

const greeting = document.getElementsByClassName('greeting')[0];
const informText = document.getElementById('inform-text');
const start = document.getElementById('start');
const startButton = document.getElementById('start-button');
const restartBlock = document.getElementById('restart');
const restartButton = document.getElementById('restart-button');
const saveButton = document.getElementById('save-button');
const answers = document.getElementById('answers');
const question = document.getElementById('question');
const cardBlock = document.getElementById('card-block');
const userNameInput = document.getElementsByClassName('username')[0];
const nameBlock = document.getElementById('name-block');
const scores = document.getElementById('scores');
const resultText = document.getElementById('result-text');
let result = 0;
let currentQuestionIndex = 0;
const resultsBlock = document.getElementById('results');
let leaderBoard;

const getUserName = () => {
  const userName = userNameInput.value;
  return userName;
};

const setFocus = () => {
  userNameInput.focus();
};

const checkAnswer = (event) => {
  const userAnswer = event.target.innerHTML;
  const currentQuestion = questionsBank[currentQuestionIndex];

  for (let i = 0; i < currentQuestion.options.length; i += 1) {
    const currentOption = currentQuestion.options[i];
    if (currentOption.text === userAnswer) {
      if (currentOption.isCorrect) {
        result += 1;
      }
      currentQuestionIndex += 1;
      render();
    }
  }
};

const render = () => {
  if (questionsBank.length === 0) {
    console.log('Try again later.');
  }
  if (currentQuestionIndex >= questionsBank.length) {
    cardBlock.classList.add('hidden');
    nameBlock.classList.remove('hidden');
    currentQuestionIndex = 0;
    restartBlock.classList.remove('hidden');
    informText.innerHTML = result === 1 ? `You have earned ${result} point!` : `You have earned  ${result} points!`;
    informText.classList.remove('hidden');
    saveButton.classList.remove('hidden');
    setFocus();

    return;
  }

  const currentQuestion = questionsBank[currentQuestionIndex];
  const currentQuestionText = currentQuestion.questionText;
  question.innerHTML = currentQuestionText;
  answers.innerHTML = '';

  for (let i = 0; i < currentQuestion.options.length; i += 1) {
    const currentOption = currentQuestion.options[i];
    const div = document.createElement('div');
    div.innerHTML = currentOption.text;
    div.className = 'answer';
    div.addEventListener('click', checkAnswer);
    answers.appendChild(div);
  }
};

startButton.addEventListener('click', (event) => {
  informText.classList.add('hidden');
  cardBlock.classList.remove('hidden');
  start.className = 'hidden';
  greeting.classList.add('hidden');
  render();
});

restartButton.addEventListener('click', (event) => {
  restartBlock.classList.add('hidden');
  cardBlock.classList.remove('hidden');
  nameBlock.classList.add('hidden');
  userNameInput.value = '';
  resultsBlock.classList.add('hidden');
  resultsBlock.innerHTML = '';
  result = 0;
  informText.classList.add('hidden');
  render();
});

userNameInput.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    const userName = getUserName();
    if (!getUserName()) {
      alert('Type your name!');
    } else {
      resultsBlock.classList.remove('hidden');
      nameBlock.classList.add('hidden');
      informText.classList.add('hidden');
      saveButton.classList.add('hidden');
    }
  }
});

const getRequest = () => {
  const xhr = new XMLHttpRequest();
  let response;
  xhr.open('GET', 'https://localhost:5001/leaderboard/');
  xhr.responseType = 'json';
  xhr.onload = () => {
    response = xhr.response;
    leaderBoard = response;
    resultsBlock.classList.remove('hidden');
    nameBlock.classList.add('hidden');
    informText.classList.add('hidden');
    saveButton.classList.add('hidden');
    leaderBoardRender();
  };
  xhr.send();
};

saveButton.addEventListener('click', (event) => {
  const userName = getUserName();
  if (!getUserName()) {
    alert('Type your name!');
    setFocus();
  } else {
    // leaderBoard.push({'name': getUserName(), 'score': result});
    const xhr = new XMLHttpRequest();
    const json = JSON.stringify({'name': getUserName(), 'score': result});
    xhr.open('POST', 'https://localhost:5001/leaderboard/', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(json);
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
      console.log('Done!');
    
      if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        getRequest();
      }
    }
  }
});

const leaderBoardRender = () => {
  const ol = document.createElement('ol');
  ol.classList.add('hidden');
  console.log(ol);
  for (let i = 0; i < leaderBoard.length; i += 1) {
    const currentUsername = leaderBoard[i].name;
    const currentScore = leaderBoard[i].score;
    const li = document.createElement('li');
    li.innerHTML = `${currentUsername} <span class="scores-position">${currentScore}</span>`;
    ol.appendChild(li);
  }
  resultsBlock.appendChild(ol);
  ol.classList.remove('hidden');
};

