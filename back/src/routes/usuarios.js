const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController')
router.post('/login', controller.login);
router.post('/cadastrarAdmin', controller.cadastrarAdmin);
router.get('/listarFuncionarios', controller.listarFuncionarios);
router.post('/cadastrarFuncionario', controller.cadastrarFuncionario);
router.delete('/desativarFuncionario/:funcionarioId', controller.desativarFuncionario);
router.post('/ativarFuncionario/:funcionarioId', controller.ativarFuncionario);
router.post('/editarFuncionario/:funcionarioId', controller.editarFuncionario);

module.exports = router;
