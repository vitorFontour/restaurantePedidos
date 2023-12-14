module.exports = function(app){
    app.get('/cadastro_produto', function (req, res){
        app.app.controller.produto.cadastro_preoduto(app, req, res)
    })
    app.post('/produto/cadastrar', function (req, res){
        app.app.controller.produto.cadastro(app, req, res)
    })
    app.get('/produto/lista_produto', function(req, res){
        app.app.controller.produto.listar(app, req, res) 
    })
    app.get('/produto/carrinho/:idProduto', function(req, res){
        app.app.controller.carrinho.adicionar(app, req, res) 
    })
    app.get('/produto/carrinho', function (req, res) {
        app.app.controllers.carrinho.listar_produtos_pedido(app, req, res);
    });

    
}