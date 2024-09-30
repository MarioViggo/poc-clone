let vendasModel = require('../models/Venda')
let produtoVendasModel = require('../models/ProdutoVenda')
let produtoModel = require('../models/Produtos')
const mongoose = require('mongoose')
const lib = require('pagarme-core-api-nodejs')
const moment = require('moment')
const PDFDocument = require('pdfkit');

exports.cadastrarVenda = async (req, res) => {
    const { data_da_venda, valor_total, lista_de_produtos, funcionario } = req.body

    let vendasArray = []
    let produtoVendasArray = []

    for (produto of lista_de_produtos) {
        const produtoVenda = new produtoVendasModel({produto: new mongoose.Types.ObjectId(produto.produto._id), quantidade: produto.quantidade})
        await produtoVenda.save()
        vendasArray.push( new mongoose.Types.ObjectId(produtoVenda._id))
    }

    try {
        const venda = new vendasModel({
            data_da_venda,
            valor_total,
            lista_de_produtos: vendasArray,
            funcionario: new mongoose.Types.ObjectId(funcionario), 
        })
    
        await venda.save()
    
        res.status(201).send(venda);
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.editarVenda = async (req, res) => {
    const { vendaId } = req.params
    const { data_da_venda, valor_total, lista_de_produtos, funcionario } = req.body

    let vendasArray = []
    console.log("=====", req.body.lista_de_produtos)
    if (lista_de_produtos) {
        for (venda of lista_de_produtos) {
            vendasArray.push(new mongoose.Types.ObjectId(venda))
        }
    }

    try {
        const venda = await vendasModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(vendaId)},
            {
                data_da_venda,
                valor_total,
                funcionario: new mongoose.Types.ObjectId(funcionario), 
            },
            {new: true}
        )

        res.status(201).send(venda);
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.cancelarVenda = async (req, res) => {
    const { vendaId } = req.params
   
    try {
        const usuario = await vendasModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(vendaId)},
            {status: 'cancelada'})

        res.status(201).send("Venda cancelada com sucesso!");
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }
};

exports.listarVendas = async (req, res) => {
    const vendas = await vendasModel.find({}).populate({path: 'lista_de_produtos', populate: {path: 'produto'}}).populate('funcionario')

    return res.status(201).send(vendas)
}

exports.obterProdutosVenda = async (req, res) => {
    const produtosVenda = await vendasModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }).populate(
        {
            path: 'lista_de_produtos',
            populate: { path: 'produto'}
        }).populate('funcionario')

    return res.status(201).send(produtosVenda)
}

exports.removerProdutoVenda = async (req, res) => {
    let produtoVenda = []

  if (req.body.quantidade == 1) {
      produtoVenda = await produtoVendasModel.deleteOne({_id: new mongoose.Types.ObjectId(req.body._id)})
      produto = await produtoModel.findOne({_id: new mongoose.Types.ObjectId(req.body.produto._id)})
      produto.estoque = produto.estoque + 1
    } 
  if (req.body.quantidade > 1) {
    produtoVenda = await produtoVendasModel.findOne({_id: new mongoose.Types.ObjectId(req.body._id)})
    produtoVenda = await produtoVendasModel.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.body._id)}, {quantidade: produtoVenda.quantidade - 1})
    produto = await produtoModel.findOne({_id: new mongoose.Types.ObjectId(req.body.produto._id)})
    produto.estoque = produto.estoque + 1
    await produto.save()
  }

    return res.status(201).send(produtoVenda)
}

exports.gerarPix = async (req, res) => {
    lib.Configuration.basicAuthUserName = process.env.PRIVATE_KEY_PROD;
    lib.Configuration.serviceRefererName = "venda";
    let amount = 1;
    let dueDate = moment(req.body.due);
    const ordersController = lib.OrdersController;
    const customerRequest = new lib.CreateCustomerRequest();
    customerRequest.name = "Consumidor";
    customerRequest.email = req.body.email;
    customerRequest.type = 'individual';
    customerRequest.document = req.body.cpf.replace("-", "").replaceAll(".", "")

    const pixRequest = new lib.CreatePixPaymentRequest();
    pixRequest.bank = '033';
    pixRequest.expiresAt = dueDate

    const request = new lib.CreateOrderRequest();
   
    request.items = [new lib.CreateOrderItemRequest()];
    request.items[0].code = "codesample" 
    request.items[0].description = req.body.descricao;
    request.items[0].quantity = 1;
    request.items[0].amount = parseInt(req.body.valor);
    request.payments = [new lib.CreatePaymentRequest()];
    request.payments[0].payment_method = 'pix';
    request.payments[0].pix = pixRequest;
    request.customer = customerRequest;
  
    ordersController
        .createOrder(request)
        .then(order => {
            return res.status(200).json({"qrcode": order.charges[0].lastTransaction.qrCode, "qrcodeurl": order.charges[0].lastTransaction.qrCodeUrl})
        })
        .catch(error => {
            console.log(error.errorResponse)
            return res.status(401).send(error.errorResponse)
        });
}

exports.gerarComprovante = async (req, res) =>  {
    const { data_da_venda, valor_total, lista_de_produtos, funcionario, status, venda_id } = req.body;

    if (!data_da_venda || !valor_total || !lista_de_produtos || !funcionario || !status) {
      return res.status(400).json({ error: 'Parâmetros faltando' });
    }
  
    const doc = new PDFDocument();
    const filename = `${venda_id}-comprovante.pdf`
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  
    doc.pipe(res);
    
    doc.fontSize(16).text('Comprovante de Venda', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Data da Venda: ${data_da_venda}`);
    doc.text(`Valor Total: R$ ${valor_total.toFixed(2)}`);
    doc.text(`Funcionário: ${funcionario.nome}`);
    doc.text(`Status: ${status}`);
    doc.text(`Método de Pagamento: Pix`);
    doc.moveDown();
    doc.text('Lista de Produtos:', { underline: true });
    
    lista_de_produtos.forEach((produto, index) => {
      doc.text(`${index + 1}. Descrição: ${produto.produto.descricao}\n  Valor: ${produto.produto.valor}\n  Quantidade: ${produto.quantidade}\n`);
    });
  
    doc.end();
  }