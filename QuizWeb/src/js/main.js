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

const answers = document.getElementById('answers');
const question = document.getElementById('question');
const cardBlock = document.getElementById('card-block');
let currentQuestionIndex = 0;

const checkAnswer = (event) => {
  const userAnswer = event.target.innerHTML;
  const currentQuestion = questionsBank[currentQuestionIndex];

  for (let i = 0; i < currentQuestion.options.length; i += 1) {
    const currentOption = currentQuestion.options[i];
    if (currentOption.text === userAnswer) {
      if (currentOption.isCorrect) {
        handleCorrectAnswer();
      } else {
        console.log('false');
      }
    }
  }
};

let render = function() {
  if (questionsBank.length === 0) {
    console.log('Try again later.');
  }
  if (currentQuestionIndex >= questionsBank.length) {
    console.log('Game is over!');
    cardBlock.classList.add('hidden');
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

window.onload = render();

let handleCorrectAnswer = function() {
  console.log('true');
  currentQuestionIndex += 1;
  render();
};
