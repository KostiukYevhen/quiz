import { getRequest } from './requests';
import { hideElements, showElements } from './utils'

let leaderboard;
const resultsBlock = document.getElementById('results-block');
const nameBlock = document.getElementById('name-block');
const informText = document.getElementById('inform-text');
const saveButton = document.getElementById('save-button');

const getLeaderboard = (username) => {
  const url = 'https://localhost:5001/leaderboard';
  const onload = (response) => {
    leaderboard = response;
    showElements([resultsBlock]);
    hideElements([nameBlock, informText, saveButton]);
    leaderboardRender(username);
  };

  getRequest(url, onload);
};

const sortLeaderboard = (arr) => (arr.sort((a, b) => (a.score > b.score ? -1 : 1)));

document.addEventListener('userIsSaved', (event) => {
  getLeaderboard(event.detail.username);
});

const leaderboardRender = (username) => {
  const lastId = leaderboard.length;
  const sortedLeaderboard = sortLeaderboard(leaderboard);
  const ol = document.createElement('ol');
  for (let i = 0; i < sortedLeaderboard.length; i += 1) {
    const currentUsername = sortedLeaderboard[i].name;
    const currentId = Number(sortedLeaderboard[i].id);
    const currentScore = sortedLeaderboard[i].score;
    const li = document.createElement('li');
    if (lastId === currentId) {
      li.innerHTML = `${currentUsername} <span class="scores-position">${currentScore}</span>`;
      li.classList.add('current-user');
    } else {
      li.innerHTML = `${currentUsername} <span class="scores-position">${currentScore}</span>`;
    }
    ol.appendChild(li);
  }
  resultsBlock.appendChild(ol);
};