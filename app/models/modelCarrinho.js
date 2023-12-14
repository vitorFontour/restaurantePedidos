const { resolve } = require('path')

function Carrinho(conexao) {
    this._conexao = conexao
    this._crypto = require('crypto')
}

Carrinho.prototype.existePedido = function (idProduto, idPedido) {    
   return new Promise((resolve, reject) => {
        this._conexao.query(`select * from carrinho where id_produto = '${idProduto}' and id_pedido = '${idPedido}'`, function(error, result){
            resolve(result)
        })        
   })
}



module.exports = function(){
    return Carrinho
}