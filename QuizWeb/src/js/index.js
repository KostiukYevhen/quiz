// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://localhost:5001/questions/');
// xhr.responseType = 'text';
// xhr.onload = () => {
//   if (xhr.status != 200) {
//     console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
//   } else {
//     console.log(`Готово, получили ${xhr.response.length} байт`);
//   }
// };
// xhr.send();

// const resp = new Response();

const questionsBank = [
  {
    question: 'What color?',
    options: [
      {
        text: 'Red',
        isCorrect: false,
      },
      {
        text: 'Green',
        isCorrect: false,
      },
      {
        text: 'Blue',
        isCorrect: true,
      },
    ],
  },
  {
    question: 'What ...?',
    options: [
      {
        text: '111',
        isCorrect: false,
      },
      {
        text: '222',
        isCorrect: true,
      },
      {
        text: '333',
        isCorrect: false,
      },
      {
        text: '444',
        isCorrect: false,
      },
    ],
  },
];

const greeting = document.getElementsByClassName('greeting')[0];
const informText = document.getElementById('inform-text');
const start = document.getElementById('start');
const startButton = document.getElementById('start-button');
const restartBlock = document.getElementById('restart');
const restartButton = document.getElementById('restart-button');
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
const ol = document.createElement('ol');

const getUserName = () => {
  const userName = userNameInput.value;
  return userName;
};

const showResults = () => {
  cardBlock.classList.add('hidden');
  const nameBlock = document.getElementById('name-block');
  restartBlock.classList.remove('hidden');
  informText.innerHTML = result === 1 ? `You have earned ${result} point!` : `You have earned  ${result} points!`;
  informText.classList.remove('hidden');
  currentQuestionIndex = 0;
  restartButton.addEventListener('click', (event) => {
    restartBlock.classList.add('hidden');
    render();
  });

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
      handleCorrectAnswer();
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
    const olList = resultsBlock.appendChild(ol);
    currentQuestionIndex = 0;
    restartBlock.classList.remove('hidden');
    informText.innerHTML = result === 1 ? `You have earned ${result} point!` : `You have earned  ${result} points!`;
    informText.classList.remove('hidden');
    restartButton.addEventListener('click', (event) => {
      restartBlock.classList.add('hidden');
      cardBlock.classList.remove('hidden');
      nameBlock.classList.add('hidden');
      userNameInput.value = '';
      resultsBlock.classList.add('hidden');
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
          olList.innerHTML += `<li>${userName} <span class="scores-position">${result}</span></li>`;
        }
      }
    });
    return;
  }

  const currentQuestion = questionsBank[currentQuestionIndex];
  const currentQuestionText = currentQuestion.question;
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

let handleCorrectAnswer = () => {
  currentQuestionIndex += 1;
  console.log(result);
  render();
};
