const options = {method: 'POST', body: '{"username":"Admin","password":"Admin"}'};

fetch('http://localhost:8080/api/auth/login', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));