const { Schema, model, mongoose } = require('mongoose');

/// add array de vendaProduto
const VendasSchema = new Schema({
    data_da_venda: {
        type: Date, 
        required: true,
    },
    valor_total: {
        type: Number, 
        required: true,
    },
    lista_de_produtos: [
     {
        type: mongoose.Types.ObjectId, 
        ref: 'ProdutoVenda',
        required: true,
    }],
    funcionario: {
        type: mongoose.Types.ObjectId, 
        ref: 'Usuarios',
    },
    status: {
        type: String, 
        enum: ['concluida', 'cancelada', 'editada']
    }

}, { timestamps: true });


module.exports = model('Vendas', VendasSchema);