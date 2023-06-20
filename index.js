const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bp = require('body-parser');

const aluno = require('./routes/aluno');
const disciplina = require('./routes/disciplina')

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "./views"));

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.use('/aluno', aluno);
app.use('/disciplina', disciplina);

app.listen(3000, () => {
  console.log('Server rodando');
});