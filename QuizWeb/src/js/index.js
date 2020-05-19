const getRequest = (url, onload) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.onload = () => onload(xhr.response);
  xhr.send();
};

const hideElements = (arr) => (arr.forEach((item, i, arr) => (arr[i].classList.add('hidden'))));
const showElements = (arr) => (arr.forEach((item, i, arr) => (arr[i].classList.remove('hidden'))));

const getLeaderboard = () => {
  const url = 'https://localhost:5001/leaderboard';
  const onload = (response) => {
    leaderBoard = response;
    showElements([resultsBlock]);
    hideElements([nameBlock, informText, saveButton]);
    leaderBoardRender();
  };

  getRequest(url, onload);
};

let questionsBank;
const getQuestions = () => {
  const url = 'https://localhost:5001/questions/';
  const onload = (response) => (questionsBank = response);
  getRequest(url, onload);
};

getQuestions();

const informText = document.getElementById('inform-text');
const restartBlock = document.getElementById('restart');
const saveButton = document.getElementById('save-button');
const cardBlock = document.getElementById('card-block');
const userNameInput = document.getElementsByClassName('username')[0];
const nameBlock = document.getElementById('name-block');
const scores = document.getElementById('scores');
const resultText = document.getElementById('result-text');
let result = 0;
let currentQuestionIndex = 0;
const resultsBlock = document.getElementById('results');
let leaderBoard;
let userName = '';

const sortLeaderBoard = (arr) => {
  return arr.sort((a, b) => a.score > b.score ? -1 : 1);
}

const getUserName = () => {
  userName = userNameInput.value;
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
    hideElements([cardBlock]);
    showElements([nameBlock, restartBlock, informText, saveButton]);
    currentQuestionIndex = 0;
    informText.innerHTML = result === 1 ? `You have earned ${result} point!` : `You have earned  ${result} points!`;
    setFocus();

    return;
  }

  const question = document.getElementById('question');
  const answers = document.getElementById('answers');
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

const greeting = document.getElementsByClassName('greeting')[0];
const start = document.getElementById('start');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
  hideElements([informText, start, greeting]);
  showElements([cardBlock]);
  render();
});

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
  showElements([cardBlock]);
  hideElements([restartBlock, nameBlock, resultsBlock, informText]);
  userNameInput.value = '';
  resultsBlock.innerHTML = '';
  result = 0;
  render();
});

userNameInput.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    if (!getUserName()) {
      alert('Type your name!');
      setFocus();
    } else {
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
          getLeaderboard();
        }
      }
    }
  }
});

saveButton.addEventListener('click', () => {
  if (!getUserName()) {
    alert('Type your name!');
    setFocus();
  } else {
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
        getLeaderboard();
      }
    }
  }
});

const leaderBoardRender = () => {
  const sortedLeaderBoard = sortLeaderBoard(leaderBoard);
  const ol = document.createElement('ol');
  for (let i = 0; i < sortedLeaderBoard.length; i += 1) {
    const currentUsername = sortedLeaderBoard[i].name;
    const currentScore = sortedLeaderBoard[i].score;
    const li = document.createElement('li');
    if (currentUsername === userName) {
      li.innerHTML = `${currentUsername} <span class="scores-position">${currentScore}</span>`;
      li.classList.add('current-user');
    } else {
      li.innerHTML = `${currentUsername} <span class="scores-position">${currentScore}</span>`;
    }
    ol.appendChild(li);
  }
  resultsBlock.appendChild(ol);
};

