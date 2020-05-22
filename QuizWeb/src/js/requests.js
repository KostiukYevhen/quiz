export const getRequest = (url, onload) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.onload = () => onload(xhr.response);
  xhr.send();
};

export const postRequest = (url, body, onSuccess) => {
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
