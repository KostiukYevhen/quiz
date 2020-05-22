export const hideElements = (arr) => (arr.forEach((item) => (item.classList.add('hidden'))));
export const showElements = (arr) => (arr.forEach((item) => (item.classList.remove('hidden'))));
