import { getRequest, postRequest } from './requests';
import { hideElements, showElements } from './utils'

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

const saveUser = (name, score) => {
  const url = 'https://localhost:5001/leaderboard/';
  const json = JSON.stringify({ name, score });
  const callUserIsSavedEvent = () => {
    const userIsSavedEvent = new CustomEvent('userIsSaved', { bubbles: true, detail: { username }});
    document.dispatchEvent(userIsSavedEvent);
  };
  postRequest(url, json, callUserIsSavedEvent);
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
