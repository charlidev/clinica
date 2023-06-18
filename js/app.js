const express = require('express');
const mysql = require('mysql');
const path = require('path'); // Importa el módulo path

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('styles'));
app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinica_ideal'
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../index.html'));
});
  

app.post('/login', (req, res) => {
  const user = req.body.userInput;
  const pass = req.body.passwordInput;

  const query = 'SELECT * FROM login WHERE user = ? AND pass = ?';
  connection.query(query, [user, pass], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length > 0) {
      // Credenciales válidas, redirigir a la página home.html
      res.sendFile(path.join(__dirname, 'home.html'));
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      res.send('Credenciales incorrectas')+results;
      
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
