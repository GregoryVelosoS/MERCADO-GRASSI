// IMPORTANDO O MODEL
const produtoModel = require("../models/produtoModel.js")

module.exports = {
    // CRUD

    // CREATE
    // ACESSAR A PÁGINA DE CADASTRO
    renderizarCadastro: (req,res) =>{
        res.send("ABRINDO PÁGINA DE CADASTRO")
    },
    // CADASTRA O PRODUTO
    cadastrar: (req,res) =>{
        produtoModel.criarProduto()
        res.end()
    }
}