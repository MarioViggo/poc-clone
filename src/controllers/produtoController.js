let produtoModel = require('../models/Produtos')
const mongoose = require('mongoose')

exports.cadastrarProduto = async (req, res) => {
    const { descricao, codigo_sequencial, status, estoque, valor } = req.body
    const {imagens, codigo_de_barras} = req.files
    let imagem_list = []
    for (imagem of imagens) {
        imagem_list.push(imagem.buffer)
    }

    try {
        const produto = new produtoModel({
            descricao,
            codigo_sequencial,
            codigo_de_barras: codigo_de_barras[0].buffer,
            status, 
            estoque,
            valor,
            imagens: imagem_list
        })
    
        await produto.save()
    
        res.status(201).send(produto);
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.subtrairEstoque = async (req, res) => {
    const { carrinho } = req.body
    let produtoToUpdate
    try {
        for (let produto of carrinho) {
            produtoToUpdate = await produtoModel.findOne({_id: new mongoose.Types.ObjectId(produto.produto._id)})
            produtoToUpdate.estoque -= produto.quantidade
            if (produtoToUpdate.estoque <= 0) {
                produtoToUpdate.status = 'inativo'
                produtoToUpdate.estoque = 0
            }
            await produtoToUpdate.save()
        }

        return res.status(201).send(produtoToUpdate)
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.editarProduto = async (req, res) => {
    const { produtoId } = req.params
    const { descricao, codigo_sequencial, status, estoque, valor } = req.body
    const {imagens, codigo_de_barras} = req.files
    console.log(req.body)

    let imagem_list = []
    if (imagens) {
        for (imagem of imagens) {
            imagem_list.push(imagem.buffer)
        }
    }
    const oldProduto = await produtoModel.findOne({_id: new mongoose.Types.ObjectId(produtoId)})
    try {
        const produto = await produtoModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(produtoId)},
            {
                descricao: descricao != "undefined" ? descricao : oldProduto.descricao,
                codigo_sequencial: codigo_sequencial != "undefined"  ? codigo_sequencial : oldProduto.codigo_sequencial,
                codigo_de_barras: codigo_de_barras ? codigo_de_barras[0].buffer : oldProduto.codigo_de_barras,
                status: status  != "undefined" ? status : (estoque > 0 ? 'ativo' : oldProduto.status), 
                estoque: estoque != "undefined" ? parseInt(estoque) : parseInt(oldProduto.estoque),
                valor: valor != "undefined" ? valor : oldProduto.valor,
                imagens: imagem_list.length > 0 ? imagem_list : oldProduto.imagens 
            },
            {new: true}
        )
        return res.status(201).send(produto);
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.desativarProduto = async (req, res) => {
    const { produtoId } = req.params
   
    try {
        const usuario = await produtoModel.findOneAndUpdate({_id: new mongoose.Types.ObjectId(produtoId)}, 
        {status: 'inativo'})

        res.status(201).send("Produto desativado com sucesso!");
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.ativarProduto = async (req, res) => {
    const { produtoId } = req.params
   
    try {
        const usuario = await produtoModel.findOneAndUpdate({_id: new mongoose.Types.ObjectId(produtoId)}, 
        {status: 'ativo'})

        res.status(201).send("Produto ativado com sucesso!");
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.listarProdutos = async (req, res) => {
    try {
        const produto = await produtoModel.find({})

        res.status(201).send(produto);
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

