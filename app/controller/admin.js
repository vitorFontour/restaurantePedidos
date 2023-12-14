const usuario = require("../rotas/usuario")

module.exports.cadastro_produto = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }
    res.render('admin/cadastro_produto', { erros: {}, noticia: {} })
}
module.exports.cadastrarPoduto = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }

    const dados = req.body

    req.assert('descricao', 'voce deve preencher o campo titulo').notEmpty()
    req.assert('preco', 'voce deve preencher o campo conteudo').notEmpty()
    
    const erros = req.validationErrors()

    if (erros) {
        res.render('admin/cadastro_produto', { erros: erros, produto: dados })
        return
    }

    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelProduto.cadastrarProduto(dados, function (error, result) {
        res.redirect('/admin/cadastro_produto')
    })

}
module.exports.cadastrar = function (app,req, res){
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }
    const idUsuario = req.params.idUsuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    const modelTipoUsuario = new app.app.models.modelTipoUsuario(conexao)
    
    
    modelUsuario.getUsuarioById(idUsuario, function(error, usuario){
        modelTipoUsuario.getTipos(function(error, tipos){
            res.render('admin/cadastro_usuario', {usuario: usuario, tipos:tipos, erros:{}})
        })
    })
}
module.exports.menu = function(app, req, res){
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }
    res.render('admin/menu')
}
module.exports.admin_cadastro_usuario = function (app, req, res) {

    const dados = req.body

    req.assert('nome', 'voce deve preencher o campo nome').notEmpty()
    req.assert('email', 'voce deve preencher o campo email').notEmpty()
    req.assert('senha', 'voce deve preencher o campo senha').notEmpty()
    req.assert('senha', 'o campo senha deve ter no minimo 4 caracteres').len(4)

    const erros = req.validationErrors()

    if (erros) {
        res.render('admin/cadastro_usuario', { erros: erros, usuario: dados })
        return
    }

    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.getUsuarioByEmail(dados.email, function (error, result) {
        if (result.length > 0) {
            let erros = [{ msg: 'este e-mail já está em uso' }]
            res.render('usuario/cadastro_usuario', { erros: erros, usuario: dados })
            return
        }
        else {
            modelUsuario.adminCadastrarUsuario(dados, function (error, result) {
                res.redirect('/admin/cadastro_usuario')
                return
            })
        }
    })
}
module.exports.listar_usuario = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }
   
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.getListarUsuario(function (error, result) {
        res.render('admin/lista_usuario', { usuario: result })
        return
    })
}
module.exports.excluir_produto = function(app, req, res){
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }
    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)
    const idProduto = req.params.idProduto

    modelProduto.excluirProduto(idProduto, function(app,req,res){
        modelProduto.getProdutos(function(app,req, res){
            res.redirect('/admin/admin_lista_produto')
        })
    })
   
}
module.exports.admin_lista_produto = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }
   
    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelProduto.getListaProduto(function (error, result) {
        res.render('admin/admin_lista_produto', { produto: result })
        return
    })
}
module.exports.tela_editar_user = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }
    const idUsuario = req.params.idUsuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    const modelTipoUsuario = new app.app.models.modelTipoUsuario(conexao)

    modelUsuario.getUsuarioById(idUsuario, function (error, usuario) {
        modelTipoUsuario.getTipos(function(error, tipos){
            res.render('admin/editar_usuario', {usuario: usuario, tipos:tipos, erros:{}})
        })
    })
}
module.exports.salvar_user = function (app, req, res) {

    const dados = req.body
    const idUsuario = req.params.idUsuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.Editar(dados, idUsuario, function (error, result) {
        res.redirect('/admin/lista_usuario')
    })
}