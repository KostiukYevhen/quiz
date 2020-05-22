const getRequest = (url, onload) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.onload = () => onload(xhr.response);
  xhr.send();
};

const hideElements = (arr) => (arr.forEach((item) => (item.classList.add('hidden'))));
const showElements = (arr) => (arr.forEach((item) => (item.classList.remove('hidden'))));

let leaderboard;
const getLeaderboard = () => {
  const url = 'https://localhost:5001/leaderboard';
  const onload = (response) => {
    leaderboard = response;
    showElements([resultsBlock]);
    hideElements([nameBlock, informText, saveButton]);
    leaderboardRender();
  };

  getRequest(url, onload);
};

let questionsBank;
const getQuestions = () => {
  const url = 'https://localhost:5001/questions/';
  const onload = (response) => {
    questionsBank = response;
  };
  getRequest(url, onload);
};

getQuestions();

const informText = document.getElementById('inform-text');
const restartBlock = document.getElementById('restart-block');
const saveButton = document.getElementById('save-button');
const cardBlock = document.getElementById('card-block');
const usernameInput = document.getElementsByClassName('username')[0];
let score = 0;
let username = '';

const sortLeaderboard = (arr) => (arr.sort((a, b) => (a.score > b.score ? -1 : 1)));

const getUsername = () => {
  username = usernameInput.value;
  return username;
};

let currentQuestionIndex = 0;
const checkAnswer = (event) => {
  const userAnswer = event.target.innerHTML;
  const currentQuestion = questionsBank[currentQuestionIndex];

  for (let i = 0; i < currentQuestion.options.length; i += 1) {
    const currentOption = currentQuestion.options[i];
    if (currentOption.text === userAnswer) {
      score += currentOption.isCorrect ? 1 : 0;
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
    informText.innerHTML = score === 1 ? `You have earned ${score} point!` : `You have earned ${score} points!`;
    usernameInput.focus();
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
const startBlock = document.getElementById('start-block');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
  hideElements([informText, startBlock, greeting]);
  showElements([cardBlock]);
  render();
});

const restartButton = document.getElementById('restart-button');
const nameBlock = document.getElementById('name-block');
const resultsBlock = document.getElementById('results-block');

restartButton.addEventListener('click', () => {
  showElements([cardBlock]);
  hideElements([restartBlock, nameBlock, resultsBlock, informText]);
  usernameInput.value = '';
  resultsBlock.innerHTML = '';
  score = 0;
  render();
});

const postRequest = (url, body, onSuccess) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.send(body);
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;
    console.log('Done!');

    if (xhr.status !== 200) {
      console.log(`${xhr.status} : ${xhr.statusText}`);
    } else {
      onSuccess();
    }
  };
};

const saveUser = (name, score) => {
  const json = JSON.stringify({ name, score });
  postRequest('https://localhost:5001/leaderboard/', json, getLeaderboard);
};

usernameInput.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    const username = getUsername();
    if (!username) {
      alert('Type your name!');
      usernameInput.focus();
    } else {
      saveUser(username, score);
    }
  }
});

saveButton.addEventListener('click', () => {
  const username = getUsername();
  if (!username) {
    alert('Type your name!');
    usernameInput.focus();
  } else {
    saveUser(username, score);
  }
});

const leaderboardRender = () => {
  const sortedLeaderboard = sortLeaderboard(leaderboard);
  const ol = document.createElement('ol');
  for (let i = 0; i < sortedLeaderboard.length; i += 1) {
    const currentUsername = sortedLeaderboard[i].name;
    const currentScore = sortedLeaderboard[i].score;
    const li = document.createElement('li');
    if (currentUsername === username) {
      li.innerHTML = `${currentUsername} <span class="scores-position">${currentScore}</span>`;
      li.classList.add('current-user');
    } else {
      li.innerHTML = `${currentUsername} <span class="scores-position">${currentScore}</span>`;
    }
    ol.appendChild(li);
  }
  resultsBlock.appendChild(ol);
};
