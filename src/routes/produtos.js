const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtoController')


router.post('/cadastrarProduto',  controller.cadastrarProduto);
router.get('/listarProdutos',  controller.listarProdutos);
router.post('/desativarProduto/:produtoId',  controller.desativarProduto);
router.post('/ativarProduto/:produtoId',  controller.ativarProduto);
router.post('/subtrairEstoque', controller.subtrairEstoque);
router.post('/editarProduto/:produto', controller.editarProduto)
module.exports = router;
