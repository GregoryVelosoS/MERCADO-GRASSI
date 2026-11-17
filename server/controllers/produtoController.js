// IMPORTANDO O MODEL
const produtoModel = require("../models/produtoModel.js")

module.exports = {
    // CRUD

    // CREATE
    // ACESSAR A PÁGINA DE CADASTRO
    renderizarCadastro: (req,res) =>{
        res.render("produtos/cadastrar")
    },
    // CADASTRA O PRODUTO
    cadastrar: async (req,res) =>{
       try{
        // PEGAR AS INFORMAÇÕES DO BODY
        const {codigo_interno, nome, categoria, unidade_venda, preco, imagem, esta_ativo } = req.body

        // CONVERSÃO DO ESTADO DO PRODUTO
        const publico_bool = esta_ativo === "1" || esta_ativo === "true"

        // CHAMA O MODEL PARA ATIVAR A EXECUÇÃO NO BANCO DA FUNÇÃO DE CRIAÇÃO
        await produtoModel.criarProduto(codigo_interno, nome, categoria, unidade_venda, preco, imagem, publico_bool)

        // REDIRECIONA O USUÁRIO
        res.redirect("/")
       }
       catch(erro){
        console.log(erro);
        res.render("erro", {erro, mensagem: "Erro ao cadastrar o produto"})
       }
    }
}