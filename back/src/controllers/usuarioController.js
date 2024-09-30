
let usuarioModel = require('../models/Usuario')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const md5 = require('md5')

exports.login = async(req, res, next) => {
    // add hash md5   
    const usuario = await usuarioModel.findOne({email: req.body.email, senha: md5(req.body.senha)})
    if (usuario) {
        let id = usuario._id 
        const token = jwt.sign({usuario}, process.env.SECRET, {
            expiresIn: 3600
          });
          usuario.password = ""

          return res.json({ auth: true, token: token, user: usuario });
    }

    return res.status(500).send("Login recusado!");
};

exports.cadastrarAdmin = async (req, res) => {
    const { email, nome, documento, nickname, senha, nivel_de_acesso } = req.body
    try {
        const usuario = new usuarioModel({
            email,
            nome,
            documento,
            nickname, 
            senha: md5(senha),
            nivel_de_acesso
        })
    
        await usuario.save()
    
        res.status(201).send(usuario);
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.cadastrarFuncionario = async (req, res) => {
    const { email, nome, documento, nickname, senha, nivel_de_acesso } = req.body
   
    try {
        const usuario = new usuarioModel({
            email,
            nome,
            documento,
            nickname, 
            senha: md5(senha),
            nivel_de_acesso,
            status: 'em atividade'
        })
    
        await usuario.save()
    
        res.status(201).send(usuario);
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.editarFuncionario = async (req, res) => {
    const { funcionarioId } = req.params
    const { email, nome, documento, nickname, senha, nivel_de_acesso } = req.body
   
    const oldUsuario = await usuarioModel.findOne({_id: new mongoose.Types.ObjectId(funcionarioId)})
    try {
        const usuario = await usuarioModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(funcionarioId)},
            {
                email: email ? email : oldUsuario.email,
                nome: nome ? nome : oldUsuario.nome,
                documento: documento ? documento : oldUsuario.documento,
                nickname: nickname ? nickname : oldUsuario.nickname, 
                senha: senha ? senha : oldUsuario.senha,
                nivel_de_acesso: nivel_de_acesso ? nivel_de_acesso : oldUsuario.nivel_de_acesso    
            },
            {new: true}
        )

        res.status(201).send(usuario);
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.desativarFuncionario = async (req, res) => {
    const { funcionarioId } = req.params
   
    try {
        const usuario = await usuarioModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(funcionarioId)},
        {'status': 'inativo'})

        res.status(201).send("Usuário desativado com sucesso!");
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.ativarFuncionario = async (req, res) => {
    const { funcionarioId } = req.params
   
    try {
        const usuario = await usuarioModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(funcionarioId)},
        {'status': 'ativo'})

        res.status(201).send("Usuário ativo com sucesso!");
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.listarFuncionarios = async (req, res) => {
    try {
        const usuario = await usuarioModel.find({})

        res.status(201).send(usuario);
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};