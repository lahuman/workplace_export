const fetch = require('node-fetch');

const call = ({ url, method = "GET", body, headers, options }) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API}${url}`, {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', ...headers },
      ...options
    })
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
}
export {
  call
}