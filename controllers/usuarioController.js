const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../connection/mysql');
const Usuario = require("../models/usuario");
const asyncHandler = require("express-async-handler");

exports.usuario_inicio = asyncHandler(async (req, res, next) => {
  await Usuario.sync();
  res.render('usuario/inicio');
});

exports.usuario_cadastrar = asyncHandler(async (req, res, next) => {
  res.render('usuario/cadastro');
});

exports.usuario_inserir = asyncHandler(async (req, res, next) => {
  await Usuario.sync();

  try {
    const { usuario, senha } = req.body;

    if (usuario && senha) {
      const usuario = await Usuario.create(req.body);
      res.redirect('/usuario/login');
    } else {
      console.log("Erro ao inserir usuário");
    }
  } catch (err) {
    console.error("Erro ao inserir disciplina: ", err);
  }
});

exports.usuario_login = asyncHandler(async (req, res, next) => {
  res.render('usuario/login');
});

exports.usuario_verifica = asyncHandler(async (req, res, next) => {
  const { usuario, senha } = req.body;

  try {
    const user = await Usuario.findOne({ where: { usuario, senha } });

    if (user) {
      // res.send(`
      //   <script>
      //     alert('Logado com sucesso!');
      //   </script>
      // `);

      res.render('usuario/inicio');
    } else {
      // res.send(`
      //   <script>
      //     alert('Usuário ou senha inválidos!');
      //   </script>
      // `);

      // res.redirect('usuario/login');
      res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
  } catch (err) {
  //   res.send(`
  //   <script>
  //     alert('Falha no login!');
  //   </script>
  // `);

  //   res.render('usuario/login');
    res.status(400).json({ error: 'Falha no login' });
  }
});

exports.usuario_logout = asyncHandler(async (req, res, next) => {
  req.session.destroy((err) => {});
  res.redirect('/');
});