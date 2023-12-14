module.exports = function(app) {
    app.get('/cadastro_produtos', function(req,res){
        app.app.controller.admin.cadastro_produto(app, req, res)
    })
    app.post('/admin/cadastrar', function (req, res) {      
        app.app.controller.admin.admin_cadastro_usuario(app, req, res)
    })
    app.get('/usuario/listar', function(req, res){
        app.app.controller.admin.listar(app,req,res)
    })       
    app.get('/admin/menu', function (req, res){
        app.app.controller.admin.menu(app, req, res)
    })
    app.get('/admin/cadastro_usuario', function(req, res){
        app.app.controller.admin.cadastrar(app,req, res)
    })    
    app.get('/admin/lista_usuario', function (req, res){
        app.app.controller.admin.listar_usuario(app,req,res)
    })
    app.get('/admin/editar_produto/:idProduto', function (req, res){
        app.app.controller.produto.tela_editar(app, req, res)
    })
    app.post('/admin/salvar_produto/:idProduto', function (req, res){
        app.app.controller.produto.salvar(app,req,res)
    })
    app.post('/admin/excluir_produto/:idProduto', function (req, res){
        app.app.controller.admin.excluir_produto(app.req,res)
    })
    app.get('/admin/admin_lista_produto', function(req, res){
        app.app.controller.admin.admin_lista_produto(app,req,res)
    })
    app.get('/admin/editar_usuario/:idUsuario', function (req, res){
        app.app.controller.admin.tela_editar_user(app, req, res)
    })
    app.post('/admin/salvar_usuario/:idUsuario', function (req, res){
        app.app.controller.admin.salvar_user(app,req,res)
    })
}