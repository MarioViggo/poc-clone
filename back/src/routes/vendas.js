const express = require('express');
const router = express.Router();
const controller = require('../controllers/vendasController')

router.post('/cadastrarVenda', controller.cadastrarVenda);
router.get('/listarVendas', controller.listarVendas);
router.get('/obterProdutosVenda/:id', controller.obterProdutosVenda);
router.post('/editarVenda/:vendaId', controller.editarVenda);
router.post('/gerarComprovante', controller.gerarComprovante);
router.delete('/cancelarVenda/:vendaId', controller.cancelarVenda);
router.post('/removerProdutoVenda/:vendaId', controller.removerProdutoVenda);
router.post('/gerarPix', controller.gerarPix)

module.exports = router;
