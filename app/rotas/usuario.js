module.exports = function (app)
{
    app.get('/cadastro_usuario', function (req, res){
        app.app.controller.usuarios.cadastro_usuario(app, req, res)
    })
    app.post('/usuario/cadastrar', function(req, res){
        app.app.controller.usuarios.cadastrar(app, req, res)
    })
    app.get('/usuario/login', function(req, res){
        app.app.controller.usuarios.login(app, req, res)
    })
    app.post('/usuario/validar', function(req, res){
        app.app.controller.usuarios.validar(app, req, res)
    })
    app.get('/usuario/lista_produto', function(req, res){
        app.app.controller.produto.listar(app, req, res) 
    })
    app.get('/', function(req, res){
        app.app.controller.usuarios.login(app, req, res)
    })
    app.get('/logout', function(req, res){
        app.app.controller.usuarios.logout(app, req, res)
    })
    app.get('/admin/editar_usuario/:idUsuario', function (req, res){
        app.app.controller.admin.tela_editar_user(app, req, res)
    })
    app.post('/admin/salvar_usuario/:idUsuario', function (req, res){
        app.app.controller.admin.salvar_user(app,req,res)
    })
    
    
}