

const getRequest = (url, onload) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.onload = () => onload(xhr.response);
  xhr.send();
};

