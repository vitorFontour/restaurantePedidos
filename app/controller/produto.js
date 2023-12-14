const produto = require("../rotas/produto")

module.exports.produto = function (app, req, res) {
    if (req.session.id_tipo_usuario != 1 && req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }

    const conexao = app.config.conexao
    const modelproduto = new app.app.models.modelProduto(conexao)

    modelProduto.getProduto(function (error, result) {
        res.render('produto/produto', { noticias: result })
    })
}
module.exports.listar = function (app, req, res) {

    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelProduto.getListaProduto(function (error, result) {
        res.render('produto/lista_produto', { produto: result })
    })
}
module.exports.admin_listar = function (app, req, res) {

    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelProduto.getListaProduto(function (error, result) {
        res.render('admin/admin_lista_produto', { produto: result })
    })
}
module.exports.cadastro = function (app, req, res) {
    const dados = req.body

    req.assert('descricao', 'voce deve preencher o campo nome').notEmpty()
    req.assert('preco', 'voce deve preencher o campo email').notEmpty()


    const erros = req.validationErrors()

    if (erros) {
        res.render('admin/cadastro_produto', { erros: erros, usuario: dados })
        return
    }

    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelProduto.getProdutoByDesc(dados.descricao, function (error, result) {
        if (result.length > 0) {
            let erros = [{ msg: 'este produto já esta cadastradado' }]
            res.render('admin/menu', { erros: erros, produto: dados })
            return
        }
        else {
            modelProduto.getCadastrarProduto(dados, function (erro, result) {
                res.redirect('/admin/menu')
                return
            })
        }
    })
}
module.exports.tela_editar = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }
    const idProduto = req.params.idProduto
    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelProduto.getProdutoById(idProduto, function (error, produto) {
        res.render('admin/editar_produto', { produto: produto })
    })
}
module.exports.salvar = function (app, req, res) {

    const dados = req.body
    const idProduto = req.params.idProduto
    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelProduto.Editar(dados, idProduto, function (error, result) {
        res.redirect('/admin/admin_lista_produto')
    })
}
