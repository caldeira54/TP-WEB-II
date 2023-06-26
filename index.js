const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const path = require('path');
const bp = require('body-parser');

const aluno = require('./routes/aluno');
const disciplina = require('./routes/disciplina');
const professor = require('./routes/professor');
const usuario = require('./routes/usuario');

const app = express();

app.use(session({secret:'asdfghjk456'}));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "./views"));

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.use('/aluno', aluno);
app.use('/disciplina', disciplina);
app.use('/professor', professor);
app.use('/usuario', usuario);

app.post('/', (req, res) => {
  res.render('usuario/login');
});

app.get('/', (req, res) => {
  res.render('usuario/login');
});

// app.get('/usuario/digitar', (req, res) => {
//   res.render('usuario/login');
// });

app.listen(3000, () => {
  console.log('Server rodando');
});