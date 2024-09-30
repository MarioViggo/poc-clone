const { Schema, model, mongoose } = require('mongoose');

/// add array de vendaProduto
const ProdutoVendaSchema = new Schema({
    produto:  {
        type: mongoose.Types.ObjectId, 
        ref: 'Produtos',
        required: true,
    },
    quantidade: {
        type: Number, 
        required: true,
    },
}, { timestamps: true });


module.exports = model('ProdutoVenda', ProdutoVendaSchema);